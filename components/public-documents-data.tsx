import { createClient } from "@supabase/supabase-js";
import { getPagination } from "./pagination";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ITEMS_PER_PAGE = 8;
const ANNOUNCEMENT_ITEMS_PER_PAGE = 7;

export async function PublicDocumentData(document_type: string, page?: number | null) {
  page == null && (page = 1);
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  let { data: documents, count } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: false })
    .eq("document_type", document_type)
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

  return { documents, pagination };
}


export async function PublicAnnouncementData(page?: number | null) {
  page == null && (page = 1);
  const { from, to } = getPagination(page - 1, ANNOUNCEMENT_ITEMS_PER_PAGE);

  let { data: documents, count } = await supabase
    .from("announcements")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ANNOUNCEMENT_ITEMS_PER_PAGE + 1)) : 1;

  return { documents, pagination };
}

export async function PublicEventsData(page?: number | null) {
  page == null && (page = 1);
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  let { data: documents, count } = await supabase
    .from("events")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

  return { documents, pagination };
}

export async function PublicEventDataByID(id?: string) {
  let { data: documents } = await supabase
    .from("events")
    .select("*")
    .eq('id', id)

  return { documents };
}

export async function PublicSlateData(page?: number | null) {
  page == null && (page = 1);
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  let { data: documents, count } = await supabase
    .from("slate")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("id", { ascending: false });

  let pagination = count != null ? Math.ceil(count / (ITEMS_PER_PAGE + 1)) : 1;

  return { documents, pagination };
}

export async function PublicSlateDataByID(id?: string) {
  let { data: documents } = await supabase
    .from("slate")
    .select("*")
    .eq('id', id)

  return { documents };
}

export async function PublicAdminStaffData() {
  let { data: documents } = await supabase
    .from("admin_staff")
    .select("*", { count: "exact", head: false })
    .order("id", { ascending: false });

  return { documents };
}

export async function PublicFacultyData(department: string) {
  let { data: documents } = await supabase
    .from("faculty")
    .select("*", { count: "exact", head: false })
    .eq("department", department)
    .order("work_type", {ascending: true})
    .order("name", { ascending: true })
    
  return { documents };
}

export async function PublicAnnouncementForHomeData() {

  let { data: documents } = await supabase
    .from("announcements")
    .select("date, title")
    .order("id", { ascending: false })
    .limit(5);

  type Announcement = { date: string; title: string };
  let formattedDocument: Announcement[] = [];
  documents?.forEach((data) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(Date.parse(data.date));
    const monthIndex = date.getMonth();
    const monthAbbreviation = monthNames[monthIndex]
    const formattedDate = `${monthAbbreviation} ${date.getDate().toString()} ${date.getFullYear().toString()}`
    formattedDocument.push({ date: formattedDate, title: data.title });
  });

  return { documents: formattedDocument };
}

export async function PublicEventsForHomeData() {

  let { data: documents } = await supabase
    .from("events")
    .select("id, image")
    .order("id", { ascending: false })
    .limit(8);

  return { documents };
}

export async function PublicUrgentAnnounementData() {
  let { data: documents } = await supabase
    .from("urgent_announcement")
    .select("*", { count: "exact", head: false })
    .order("id", { ascending: false })
    .limit(1)

  return { documents };
}