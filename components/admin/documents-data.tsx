import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ITEMS_PER_PAGE = 9;

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit + 1 : 0;
  const to = page ? from + size : size;

  return { from, to };
};

export default async function DocumentData(id?: string, page?: number) {
  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (id == null) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .order("created_at", { ascending: false });

    let pagination =
      count != null ? Math.ceil((count - 1) / ITEMS_PER_PAGE) : 1;
    return { documents, pagination };
  } else {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*")
      .eq("id", parseInt(id));

    let pagination =
      count != null ? Math.ceil((count - 1) / ITEMS_PER_PAGE) : 1;
    return { documents, pagination };
  }
}

export async function DocumentSearch(
  title?: string,
  documentType?: string,
  page?: number,
) {
  title == "" || title == null
    ? (title = undefined)
    : (title = "%" + title + "%");
  documentType == "" || documentType == null
    ? (documentType = undefined)
    : null;

  if (page == null) page = 1;
  const { from, to } = getPagination(page - 1, ITEMS_PER_PAGE);

  if (title != undefined && documentType != undefined) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .eq("document_type", documentType)
      .ilike("title", title)
      .order("created_at", { ascending: false });

    let pagination =
      count != null ? Math.ceil((count - 1) / ITEMS_PER_PAGE) : 1;
    return { documents, pagination };
  }

  if (title != undefined) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .ilike("title", title)
      .order("created_at", { ascending: false });

    let pagination =
      count != null ? Math.ceil((count - 1) / ITEMS_PER_PAGE) : 1;
    return { documents, pagination };
  }

  if (documentType != undefined) {
    let { data: documents, count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: false })
      .range(from, to)
      .eq("document_type", documentType)
      .order("created_at", { ascending: false });

    let pagination =
      count != null ? Math.ceil((count - 1) / ITEMS_PER_PAGE) : 1;
    return { documents, pagination };
  }

  let { data: documents, count } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: false })
    .range(from, to)
    .order("created_at", { ascending: false });

  let pagination =
      count != null ? Math.ceil((count - 1) / ITEMS_PER_PAGE) : 1;
    return { documents, pagination };
}
