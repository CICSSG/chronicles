import { createClient } from "@supabase/supabase-js";
import { getPagination } from "./pagination";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ITEMS_PER_PAGE = 8;

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
