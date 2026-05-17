import { getPagination } from "./pagination";

type PublicDataResponse<T> = {
  documents: T[] | null;
  pagination?: number;
  count?: number;
  success?: boolean;
  error?: string;
};

const fetchPublicData = async <T,>(searchParams: Record<string, string | number | undefined>) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value != null && value !== "") {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`/api/public-data?${params.toString()}`);
  const result = (await response.json().catch(() => null)) as PublicDataResponse<T> | null;

  if (!response.ok || !result) {
    return { documents: null, error: result?.error ?? "Request failed" } as PublicDataResponse<T>;
  }

  return result;
};

const ITEMS_PER_PAGE = 9;
const ANNOUNCEMENT_ITEMS_PER_PAGE = 8;

export async function PublicDocumentData(
  document_type: string,
  page?: number | null,
) {
  const currentPage = page ?? 1;
  const { documents, pagination: responsePagination } = await fetchPublicData<any>({
    collection: "documents",
    document_type,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    count: 1,
  });
  const pagination = responsePagination ?? 1;

  return { documents, pagination };
}

export async function PublicAnnouncementData(page?: number | null) {
  const currentPage = page ?? 1;
  const { documents, pagination: responsePagination } = await fetchPublicData<any>({
    collection: "announcements",
    page: currentPage,
    limit: ANNOUNCEMENT_ITEMS_PER_PAGE,
    count: 1,
  });
  const pagination = responsePagination ?? 1;

  return { documents, pagination };
}

export async function PublicEventsData(page?: number | null) {
  const currentPage = page ?? 1;
  const { documents, pagination: responsePagination } = await fetchPublicData<any>({
    collection: "events",
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    count: 1,
  });
  const pagination = responsePagination ?? 1;

  return { documents, pagination };
}

export async function PublicEventDataByID(id?: string) {
  const { documents } = await fetchPublicData<any>({
    collection: "events",
    id,
  });

  return { documents };
}

export async function PublicSlateData(page?: number | null) {
  const currentPage = page ?? 1;
  const { documents, pagination: responsePagination } = await fetchPublicData<any>({
    collection: "slate",
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    count: 1,
  });
  const pagination = responsePagination ?? 1;

  return { documents, pagination };
}

export async function PublicSlateDataByID(id?: string) {
  const { documents } = await fetchPublicData<any>({
    collection: "slate",
    id,
  });

  return { documents };
}

export async function PublicAdminStaffData() {
  const { documents } = await fetchPublicData<any>({
    collection: "admin_staff",
    all: 1,
  });

  return { documents };
}

export async function PublicFacultyData(department: string) {
  const { documents } = await fetchPublicData<any>({
    collection: "faculty",
    department,
    all: 1,
  });

  return { documents };
}

export async function PublicAnnouncementForHomeData() {
  const { documents } = await fetchPublicData<any>({
    collection: "announcements",
    limit: 5,
  });

  type Announcement = { date: string; title: string };
  let formattedDocument: Announcement[] = [];
  documents?.forEach((data) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(Date.parse(data.date));
    const monthIndex = date.getMonth();
    const monthAbbreviation = monthNames[monthIndex];
    const formattedDate = `${monthAbbreviation} ${date.getDate().toString()} ${date.getFullYear().toString()}`;
    formattedDocument.push({ date: formattedDate, title: data.title });
  });

  return { documents: formattedDocument };
}

export async function PublicEventsForHomeData() {
  const { documents } = await fetchPublicData<any>({
    collection: "events",
    limit: 8,
  });

  return { documents };
}

export async function PublicUrgentAnnounementData() {
  const { documents } = await fetchPublicData<any>({
    collection: "urgent_announcement",
    limit: 1,
  });

  return { documents };
}

export async function CampusInfo() {
  const { documents: east_documents } = await fetchPublicData<any>({
    collection: "east_campus",
    all: 1,
  });

  const { documents: west_documents } = await fetchPublicData<any>({
    collection: "west_campus",
    all: 1,
  });

  return { east_documents, west_documents };
}

export async function PanimolaTimelineData() {
  const { documents } = await fetchPublicData<any>({
    collection: "panimola_timeline",
    all: 1,
  });

  return { documents };
}

export async function GetAnonymousSubmissions(ids: string[]) {
  const { documents } = await fetchPublicData<any>({
    collection: "anonymous",
    ids: ids.join(","),
  });

  return { documents };
}

export async function GetAnonymousSubmission(id: string) {
  const { documents } = await fetchPublicData<any>({
    collection: "anonymous",
    id,
  });

  return documents && documents.length > 0
    ? { success: true, documents }
    : { success: false, documents: null };
}

export async function AddAnonymousSubmission(data: any) {
  const response = await fetch("/api/anonymous", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "add", data }),
  });

  const result = await response.json().catch(() => null);
  return response.ok && result
    ? result
    : { success: false, documents: null, error: result?.error ?? "Request failed" };
}

export async function SendMessage(id: string, messages: any[]) {
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