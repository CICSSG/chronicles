import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const databaseName = process.env.MONGODB_DATABASE;

if (!databaseName) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DATABASE"');
}

const pageDefaults: Record<string, number> = {
  documents: 8,
  announcements: 7,
  events: 8,
  slate: 8,
};

type SortSpec = Record<string, 1 | -1>;

const listCollections = new Set([
  "documents",
  "announcements",
  "events",
  "slate",
  "anonymous",
  "admin_staff",
  "faculty",
  "east_campus",
  "west_campus",
  "panimola_timeline",
  "urgent_announcement",
]);

function toNumber(value: string | null, fallback: number) {
  const parsed = value ? Number(value) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildProjection(collection: string, isSingle = false) {
  if (collection === "documents") {
    return {
      _id: 1,
      id: 1,
      title: 1,
      date: 1,
      document_type: 1,
      description: 1,
      author: 1,
      link: 1,
      image: 1,
    };
  }

  if (collection === "announcements") {
    return {
      _id: 1,
      id: 1,
      title: 1,
      date: 1,
      link: 1,
      description: 1,
      image: 1,
    };
  }

  if (collection === "events") {
    return {
      _id: 1,
      id: 1,
      title: 1,
      image: 1,
      date: 1,
      academic_year: 1,
      location: 1,
      project_heads: 1,
      highlights: 1,
      description: 1,
      images: 1,
      album_link: 1,
    };
  }

  if (collection === "slate") {
    return {
      _id: 1,
      id: 1,
      academic_year: 1,
      image: 1,
      directorate: 1,
      legislative: 1,
      adviser: 1,
      governor: 1,
      vice_governor: 1,
      junior_officers: 1,
      committees: 1,
    };
  }

  if (collection === "urgent_announcement") {
    return {
      _id: 1,
      id: 1,
      announcement: 1,
      date: 1,
      visibility: 1,
      time_visibility: 1,
      button_text: 1,
      button_link: 1,
      button_visibility: 1,
      button_new_tab: 1,
    };
  }

  if (collection === "anonymous") {
    return { _id: 1 };
  }

  if (collection === "faculty") {
    return {
      _id: 1,
      id: 1,
      department: 1,
      name: 1,
      work_type: 1,
      specialization: 1,
      image: 1,
    };
  }

  if (collection === "admin_staff") {
    return {
      _id: 1,
      id: 1,
      dean: 1,
      associate_dean: 1,
      staff: 1,
    };
  }

  if (collection === "east_campus" || collection === "west_campus") {
    return {
      _id: 1,
      id: 1,
      name: 1,
      number: 1,
      location: 1,
      services: 1,
      organization: 1,
      description: 1,
      image: 1,
    };
  }

  if (collection === "panimola_timeline") {
    return {
      _id: 1,
      id: 1,
      date: 1,
      title: 1,
      description: 1,
    };
  }

  return isSingle ? { _id: 1 } : { _id: 1 };
}

function buildFilter(searchParams: URLSearchParams, collection: string) {
  const id = searchParams.get("id");
  const documentType = searchParams.get("document_type");
  const department = searchParams.get("department");
  const ids = searchParams.get("ids");
  const searchField = searchParams.get("search_field");
  const searchTerm = searchParams.get("search_term");

  const filter: Record<string, unknown> = {};

  if (id) {
    // If id looks like a Mongo ObjectId, use `_id`, otherwise use legacy `id` field
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        filter._id = new ObjectId(id);
      } catch (e) {
        filter.id = id;
      }
    } else {
      filter.id = id;
    }
  }

  if (documentType) {
    filter.document_type = documentType;
  }

  if (department) {
    filter.department = department;
  }

  if (collection === "anonymous" && ids) {
    filter.id = { $in: ids.split(",").map((value) => value.trim()).filter(Boolean) };
  }

  if (searchField && searchTerm) {
    filter[searchField] = { $regex: searchTerm, $options: "i" };
  }

  return filter;
}

function buildSort(collection: string): SortSpec {
  if (collection === "faculty") {
    return { work_type: 1, name: 1 };
  }

  if (collection === "east_campus" || collection === "west_campus" || collection === "panimola_timeline") {
    return { id: 1 };
  }

  if (collection === "anonymous") {
    return { updated_at: -1 };
  }

  return { id: -1 };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");

  if (!collection) {
    return NextResponse.json({ error: "Missing collection" }, { status: 400 });
  }

  const client = await clientPromise;
  const database = client.db(databaseName);
  const mongoCollection = database.collection(collection);
  const filter = buildFilter(searchParams, collection);
  const projection = buildProjection(collection);
  const sort = buildSort(collection);
  const shouldReturnAll = searchParams.get("all") === "1";

  if (!listCollections.has(collection)) {
    const documents = await mongoCollection.find(filter, { projection }).sort(sort).toArray();
    return NextResponse.json({ documents });
  }

  const shouldCount = searchParams.get("count") === "1";
  const page = toNumber(searchParams.get("page"), 1);
  const limit = toNumber(searchParams.get("limit"), pageDefaults[collection] ?? 8);
  const skip = shouldReturnAll ? 0 : (page - 1) * limit;
  const effectiveLimit = shouldReturnAll ? 0 : limit;

  const query = shouldReturnAll
    ? mongoCollection.find(filter, { projection }).sort(sort)
    : mongoCollection.find(filter, { projection }).sort(sort).skip(skip).limit(effectiveLimit);
  const [documents, count] = await Promise.all([
    query.toArray(),
    shouldCount ? mongoCollection.countDocuments(filter) : Promise.resolve(undefined),
  ]);

  return NextResponse.json({
    documents,
    count,
    pagination: count != null && !shouldReturnAll ? Math.ceil(count / limit) : undefined,
  });
}