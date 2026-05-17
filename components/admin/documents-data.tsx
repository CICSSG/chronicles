import { getPagination } from "../pagination";

const ITEMS_PER_PAGE = 9;

type AdminDataResponse<T> = {
  documents: T[] | null;
  count?: number;
  pagination?: number;
  error?: string;
};

async function fetchAdminData<T>(searchParams: Record<string, string | number | undefined>) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value != null && value !== "") {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`/api/public-data?${params.toString()}`);
  const result = (await response.json().catch(() => null)) as AdminDataResponse<T> | null;

  if (!response.ok || !result) {
    throw new Error(result?.error ?? "Request failed");
  }

  return result;
}

function buildSearchParams(
  collectionName: string,
  page: number | null | undefined,
  itemsPerPage: number,
  filter?: Record<string, any>,
) {
  const searchParams: Record<string, string | number | undefined> = {
    collection: collectionName,
    page: page ?? 1,
    limit: itemsPerPage,
    count: 1,
  };

  if (!filter) {
    return searchParams;
  }

  Object.entries(filter).forEach(([key, value]) => {
    if (value == null || value === "") return;

    if (key.endsWith("_ilike")) {
      const field = key.replace(/_ilike$/, "");
      searchParams.search_field = field;
      searchParams.search_term = String(value).replace(/^%|%$/g, "");
      return;
    }

    if (key.endsWith("_in")) {
      const field = key.replace(/_in$/, "");
      if (field === "id" && Array.isArray(value)) {
        searchParams.ids = value.join(",");
      }
      return;
    }

    searchParams[key] = value;
  });

  return searchParams;
}

async function queryCollectionPaginated(
  collectionName: string,
  select: string | undefined,
  page: number | null | undefined,
  itemsPerPage: number,
  filter?: any,
  sort?: any,
) {
  const result = await fetchAdminData<any>(buildSearchParams(collectionName, page, itemsPerPage, filter));
  return {
    documents: result.documents,
    count: result.count ?? result.documents?.length ?? 0,
  };
}

async function queryCollectionById(collectionName: string, select: string | undefined, id?: string) {
  const result = await fetchAdminData<any>({ collection: collectionName, id });
  return { documents: result.documents };
}

export default async function DocumentData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("documents", "*", page, ITEMS_PER_PAGE, undefined, { id: -1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("documents", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function DocumentSearch(
  title?: string,
  documentType?: string,
  page?: number,
) {
  title == "" || title == null ? (title = undefined) : (title = "%" + title + "%");
  documentType == "" || documentType == null ? (documentType = undefined) : null;

  const filter: any = {};
  if (title != undefined) filter["title_ilike"] = title;
  if (documentType != undefined) filter["document_type"] = documentType;

  const { documents, count } = await queryCollectionPaginated("documents", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: -1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function AnnouncementData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("announcements", "*", page, ITEMS_PER_PAGE, undefined, { id: -1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("announcements", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function AnnouncementSearch(title?: string, page?: number) {
  title == "" || title == null ? (title = undefined) : (title = "%" + title + "%");
  const filter: any = {};
  if (title != undefined) filter["title_ilike"] = title;

  const { documents, count } = await queryCollectionPaginated("announcements", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: -1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function EventsData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("events", "*", page, ITEMS_PER_PAGE, undefined, { id: -1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("events", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function EventsSearch(title?: string, page?: number) {
  title == "" || title == null ? (title = undefined) : (title = "%" + title + "%");
  const filter: any = {};
  if (title != undefined) filter["title_ilike"] = title;
  const { documents, count } = await queryCollectionPaginated("events", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: -1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function SlatesData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("slate", "*", page, ITEMS_PER_PAGE, undefined, { id: -1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("slate", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function SlatesSearch(title?: string, page?: number) {
  title == "" || title == null ? (title = undefined) : (title = "%" + title + "%");
  const filter: any = {};
  if (title != undefined) filter["title_ilike"] = title;
  const { documents, count } = await queryCollectionPaginated("slate", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: -1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function AdminStaffData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("admin_staff", "*", page, ITEMS_PER_PAGE, undefined, { id: -1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("admin_staff", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function AdminStaffSearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  const filter: any = {};
  if (title != undefined) filter["title_ilike"] = title;
  const { documents, count } = await queryCollectionPaginated("admin_staff", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: -1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function FacultyData(id?: string, page?: number) {
  if (id == null) {
    const sort = { department: 1, work_type: 1, id: -1 };
    const { documents, count } = await queryCollectionPaginated("faculty", "*", page, ITEMS_PER_PAGE, undefined, sort);
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("faculty", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function FacultySearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  const filter: any = {};
  if (title != undefined) filter["name_ilike"] = title;
  const sort = { department: 1, work_type: 1, id: -1 };
  const { documents, count } = await queryCollectionPaginated("faculty", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, sort);
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function UrgentAnnouncementData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("urgent_announcement", "*", page, ITEMS_PER_PAGE, undefined, { id: -1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("urgent_announcement", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function UrgentAnnouncementDataSingle() {
  const { documents } = await queryCollectionPaginated("urgent_announcement", "*", 1, 1, undefined, { id: -1 });
  return { documents };
}

export async function EastCampusData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("east_campus", "*", page, ITEMS_PER_PAGE, undefined, { id: 1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("east_campus", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function EastCampusSearch(
  name?: string,
  page?: number,
) {
  name == "" || name == null
    ? (name = undefined)
    : (name = "%" + name + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  const filter: any = {};
  if (name != undefined) filter["name_ilike"] = name;
  const { documents, count } = await queryCollectionPaginated("east_campus", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: 1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function WestCampusData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("west_campus", "*", page, ITEMS_PER_PAGE, undefined, { id: 1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("west_campus", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function WestCampusSearch(
  name?: string,
  page?: number,
) {
  name == "" || name == null
    ? (name = undefined)
    : (name = "%" + name + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  const filter: any = {};
  if (name != undefined) filter["name_ilike"] = name;
  const { documents, count } = await queryCollectionPaginated("west_campus", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: 1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function PanimolaData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("panimola_timeline", "*", page, ITEMS_PER_PAGE, undefined, { id: 1 });
    const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("panimola_timeline", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (ITEMS_PER_PAGE + 1)) : 1;
    return { documents, pagination };
  }
}

export async function PanimolaSearch(
  name?: string,
  page?: number,
) {
  name == "" || name == null
    ? (name = undefined)
    : (name = "%" + name + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  const filter: any = {};
  if (name != undefined) filter["name_ilike"] = name;
  const { documents, count } = await queryCollectionPaginated("panimola_timeline", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: 1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function SulongData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("anonymous", "*", page, 12, undefined, { updated_at: -1 });
    const pagination = count != null ? Math.ceil(count / (12 + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("anonymous", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (12 + 1)) : 1;
    return { documents, pagination };
  }
}

export async function SulongSearch(page?: number) {
  const { documents, count } = await queryCollectionPaginated("anonymous", "*", page, 12, undefined, { updated_at: -1 });
  const pagination = count != null ? Math.ceil(count / (12 + 1)) : 1;
  return { documents, pagination };
}

export async function SendReply(id: string, messages: any[]) {
  const normalizedId = id.replace(/^Pioneer-/i, "");
  const response = await fetch("/api/anonymous", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "message", id: normalizedId, messages }),
  });

  const result = await response.json().catch(() => null);
  return response.ok && result
    ? result
    : { success: false, documents: null, error: result?.error ?? "Request failed" };
}

export async function FetchDeskData(id?: string, page?: number) {
  if (id == null) {
    const { documents, count } = await queryCollectionPaginated("fetchdesk", "*", page, 12, undefined, { date: -1 });
    const pagination = count != null ? Math.ceil(count / (12 + 1)) : 1;
    return { documents, pagination };
  } else {
    const { documents } = await queryCollectionById("fetchdesk", "*", id);
    const pagination = documents?.length != null ? Math.ceil(documents.length / (12 + 1)) : 1;
    return { documents, pagination };
  }
}

export async function FetchDeskSearch(title?: string, page?: number) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  const filter: any = {};
  if (title != undefined) filter["student_number_ilike"] = title;
  const { documents, count } = await queryCollectionPaginated("fetchdesk", "*", page, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined, { id: -1 });
  const pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;
  return { documents, pagination };
}

export async function GetAttendanceList() {
  const result = await fetchAdminData<any>({ collection: "attendance" });
  const documents = [...(result.documents ?? [])].sort((a, b) => {
    const aTime = new Date(a.date ?? a.updated_at ?? 0).getTime();
    const bTime = new Date(b.date ?? b.updated_at ?? 0).getTime();
    return bTime - aTime;
  });
  return { documents };
}

export async function DocumentsAll(title?: string, documentType?: string): Promise<{ documents: any[] | null }> {
  title == "" || title == null ? (title = undefined) : (title = "%" + title + "%");
  documentType == "" || documentType == null ? (documentType = undefined) : null;

  const filter: any = {};
  if (title != undefined) filter["title_ilike"] = title;
  if (documentType != undefined) filter["document_type"] = documentType;

  const params = buildSearchParams("documents", 1, ITEMS_PER_PAGE, Object.keys(filter).length ? filter : undefined);
  // request all matching documents from server
  const result = await fetchAdminData<any>({ collection: "documents", all: 1, ...params });
  const documents = result.documents ?? null;
  return { documents };
}

export async function CollectionAll(
  collectionName: string,
  filter?: Record<string, any>,
): Promise<{ documents: any[] | null }> {
  const params = buildSearchParams(
    collectionName,
    1,
    ITEMS_PER_PAGE,
    filter,
  );
  const result = await fetchAdminData<any>({
    collection: collectionName,
    all: 1,
    ...params,
  });
  const documents = result.documents ?? null;
  return { documents };
}