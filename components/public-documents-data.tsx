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