import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const fallbackUri = process.env.MONGODB_URI_FALLBACK;
const options = { appName: "devrel.template.nextjs" };

let clientPromise: Promise<MongoClient>;

const connectWithUri = async (connectionUri: string) => {
  const mongoClient = new MongoClient(connectionUri, options);
  await mongoClient.connect();
  return mongoClient;
};

const createClientPromise = async () => {
  try {
    return await connectWithUri(uri);
  } catch (error) {
    const isSrvLookupFailure =
      error instanceof Error &&
      /querySrv|ECONNREFUSED/i.test(error.message);

    if (isSrvLookupFailure && fallbackUri) {
      console.warn(
        "Mongo SRV lookup failed. Retrying with MONGODB_URI_FALLBACK.",
      );
      return connectWithUri(fallbackUri);
    }

    throw error;
  }
};

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createClientPromise();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;