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

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from the anonymous API route!" });
}

// export async function POST(request: NextRequest) {
//   const { email, id, type } = await request.json();

//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MY_EMAIL,
//       pass: process.env.MY_PASSWORD,
//     },
//   });

//   let mailOptions: Mail.Options;

//   if (type == "Received") {
//     mailOptions = {
//       from: "cics.chronicles@gmail.com",
//       to: "cics.chronicles@gmail.com",
//       cc: email,
//       subject: `[ANONYMOUS MESSAGE] Pioneer-${id} New Submission`,
//       html: `<p>Your message has been received! We will notify you when we have an update.<br>Here is your submission ID for future reference: <strong>Pioneer-${id}</strong></p>`,
//     };
//   } else if (type == "UserReply") {
//     mailOptions = {
//       from: "cics.chronicles@gmail.com",
//       to: "cics.chronicles@gmail.com",
//       subject: `[ANONYMOUS MESSAGE] Pioneer-${id} Submission Reply`,
//       html: `<p>User has replied to your message.</p>`,
//     };
//   } else if (type == "UserSend") {
//     mailOptions = {
//       from: "cics.chronicles@gmail.com",
//       to: "cics.chronicles@gmail.com",
//       subject: `[ANONYMOUS MESSAGE] Pioneer-${id} New Submission`,
//       html: `<p>A new submission has been sent</p>`,
//     };
//   } else {
//     mailOptions = {
//       from: "cics.chronicles@gmail.com",
//       to: email,
//       subject: `[ANONYMOUS MESSAGE] Pioneer-${id} Submission Update`,
//       html: `<p>Your message has received a reply! Here is your submission ID for future reference: <strong>Pioneer-${id}</strong></p>`,
//     };
//   }

//   const sendMailPromise = () =>
//     new Promise<string>((resolve, reject) => {
//       transport.sendMail(mailOptions, function (err) {
//         if (!err) {
//           resolve("Email sent");
//         } else {
//           reject(err.message);
//         }
//       });
//     });

//   try {
//     await sendMailPromise();
//     return NextResponse.json({ message: "Email sent" });
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }
