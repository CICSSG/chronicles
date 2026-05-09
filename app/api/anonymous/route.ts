import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore =
  (globalThis as typeof globalThis & {
    __anonymousRateLimitStore?: Map<string, RateLimitBucket>;
  }).__anonymousRateLimitStore ?? new Map<string, RateLimitBucket>();

(globalThis as typeof globalThis & {
  __anonymousRateLimitStore?: Map<string, RateLimitBucket>;
}).__anonymousRateLimitStore = rateLimitStore;

const RATE_LIMITS = {
  add: { limit: 5, windowMs: 10 * 60 * 1000 },
  message: { limit: 20, windowMs: 10 * 60 * 1000 },
  email: { limit: 20, windowMs: 10 * 60 * 1000 },
} as const;

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor ?? request.headers.get("x-real-ip") ?? "unknown";
}

function allowRequest(bucketKey: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = rateLimitStore.get(bucketKey);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitStore.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }

  bucket.count += 1;
  rateLimitStore.set(bucketKey, bucket);
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action = "email", email, id, type, data, messages } = body ?? {};
  const clientId = getClientIdentifier(request);

  if (action === "add") {
    const check = allowRequest(`add:${clientId}`, RATE_LIMITS.add.limit, RATE_LIMITS.add.windowMs);

    if (!check.allowed) {
      return NextResponse.json(
        { success: false, documents: null, error: "Too many submissions. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": String(check.retryAfterSeconds) } },
      );
    }

    const { data: documents, error } = await supabase.from("anonymous").insert(data).select();

    if (error) {
      return NextResponse.json({ success: false, documents: null, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, documents });
  }

  if (action === "message") {
    const check = allowRequest(`message:${clientId}`, RATE_LIMITS.message.limit, RATE_LIMITS.message.windowMs);

    if (!check.allowed) {
      return NextResponse.json(
        { success: false, documents: null, error: "Too many messages. Please slow down and try again." },
        { status: 429, headers: { "Retry-After": String(check.retryAfterSeconds) } },
      );
    }

    const { data: documents, error } = await supabase
      .from("anonymous")
      .update({ messages: messages, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ success: false, documents: null, error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      documents && documents.length > 0
        ? { success: true, documents }
        : { success: false, documents: null, error: "Submission not found" },
      { status: documents && documents.length > 0 ? 200 : 404 },
    );
  }

  const check = allowRequest(`email:${clientId}`, RATE_LIMITS.email.limit, RATE_LIMITS.email.windowMs);

  if (!check.allowed) {
    return NextResponse.json(
      { message: "Too many emails. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(check.retryAfterSeconds) } },
    );
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  let mailOptions: Mail.Options;

  if (type == "Received") {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: "cics.chronicles@gmail.com",
      cc: email,
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} New Submission`,
      html: `<p>Your message has been received! We will notify you when we have an update.<br>Here is your submission ID for future reference: <strong>Pioneer-${id}</strong></p>`,
    };
  } else if (type == "UserReply") {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: "cics.chronicles@gmail.com",
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} Submission Reply`,
      html: `<p>User has replied to your message.</p>`,
    };
  } else if (type == "UserSend") {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: "cics.chronicles@gmail.com",
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} New Submission`,
      html: `<p>A new submission has been sent</p>`,
    };
  } else {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: email,
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} Submission Update`,
      html: `<p>Your message has received a reply! Here is your submission ID for future reference: <strong>Pioneer-${id}</strong></p>`,
    };
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
