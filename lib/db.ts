// lib/db.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // e.g., "mongodb://localhost:27017/database"

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const client = new MongoClient(uri);

export default client;
