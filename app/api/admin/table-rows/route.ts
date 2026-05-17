import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const databaseName = process.env.MONGODB_DATABASE;

if (!databaseName) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DATABASE"');
}

const collections = [
  "announcements",
  "documents",
  "events",
  "slate",
  "profiles",
  "faculty",
];

export async function GET() {
  const client = await clientPromise;
  const database = client.db(databaseName);

  const rowCounts = Object.fromEntries(
    await Promise.all(
      collections.map(async (collectionName) => {
        const count = await database.collection(collectionName).countDocuments();
        return [collectionName, count] as const;
      }),
    ),
  );

  return NextResponse.json(rowCounts);
}