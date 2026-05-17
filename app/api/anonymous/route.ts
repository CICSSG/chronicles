import { type NextRequest, NextResponse } from "next/server";
import { MongoClient, Db, ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB ?? process.env.MONGODB_DATABASE ?? "chronicles";

const globalWithMongo = globalThis as typeof globalThis & {
  __mongoClient?: MongoClient;
};

globalWithMongo.__mongoClient = globalWithMongo.__mongoClient ?? new MongoClient(MONGODB_URI);

async function getDb(): Promise<Db> {
  const client = globalWithMongo.__mongoClient!;
  // `client.connect()` is safe to call multiple times (idempotent)
  // and avoids relying on internal `topology` properties that differ
  // between driver versions.
  await client.connect();
  return client.db(MONGODB_DB);
}

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

function normalizeAnonymousId(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return raw.replace(/^Pioneer-/i, "");
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from the anonymous API route!" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action = "email", email, id, type, data, messages } = body ?? {};
  const clientId = getClientIdentifier(request);

  if (action === "add") {
    const check = allowRequest(
      `add:${clientId}`,
      RATE_LIMITS.add.limit,
      RATE_LIMITS.add.windowMs,
    );

    if (!check.allowed) {
      return NextResponse.json(
        {
          success: false,
          documents: null,
          error: "Too many submissions. Please wait before trying again.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(check.retryAfterSeconds) },
        },
      );
    }

    try {
      const db = await getDb();

      const now = new Date().toISOString();
      if (Array.isArray(data)) {
        const docsToInsert = data.map((d: any) => ({
          ...d,
          created_at: d?.created_at ?? now,
          updated_at: d?.updated_at ?? now,
        }));
        const result = await db.collection("anonymous").insertMany(docsToInsert);
        const ids = Object.values(result.insertedIds) as ObjectId[];
        const documents = await db
          .collection("anonymous")
          .find({ _id: { $in: ids } })
          .toArray();
        return NextResponse.json({ success: true, documents });
      } else {
        const doc = {
          ...(data ?? {}),
          created_at: data?.created_at ?? now,
          updated_at: data?.updated_at ?? now,
        };
        const result = await db.collection("anonymous").insertOne(doc);
        const documents = await db
          .collection("anonymous")
          .find({ _id: result.insertedId })
          .toArray();
        return NextResponse.json({ success: true, documents });
      }
    } catch (err: any) {
      return NextResponse.json(
        { success: false, documents: null, error: err?.message ?? String(err) },
        { status: 500 },
      );
    }
  }

  if (action === "message") {
    const check = allowRequest(
      `message:${clientId}`,
      RATE_LIMITS.message.limit,
      RATE_LIMITS.message.windowMs,
    );

    if (!check.allowed) {
      return NextResponse.json(
        {
          success: false,
          documents: null,
          error: "Too many messages. Please slow down and try again.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(check.retryAfterSeconds) },
        },
      );
    }

    try {
      const db = await getDb();
      const normalizedId = normalizeAnonymousId(id);
      const numericId = Number(normalizedId);
      const filter = Number.isFinite(numericId)
        ? { $or: [{ id: numericId }, { id: normalizedId }] }
        : { $or: [{ id: normalizedId }, { id: String(id ?? "") }] };
      const updateResult = await db.collection("anonymous").updateOne(
        filter,
        { $set: { messages, updated_at: new Date().toISOString() } },
      );

      if (updateResult.matchedCount === 0) {
        return NextResponse.json(
          { success: false, documents: null, error: "Submission not found" },
          { status: 404 },
        );
      }

      const documents = await db.collection("anonymous").find(filter).toArray();
      return NextResponse.json({ success: true, documents }, { status: 200 });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, documents: null, error: err?.message ?? String(err) },
        { status: 500 },
      );
    }
  }

  const check = allowRequest(
    `email:${clientId}`,
    RATE_LIMITS.email.limit,
    RATE_LIMITS.email.windowMs,
  );

  if (!check.allowed) {
    return NextResponse.json(
      { message: "Too many emails. Please wait before trying again." },
      {
        status: 429,
        headers: { "Retry-After": String(check.retryAfterSeconds) },
      },
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
