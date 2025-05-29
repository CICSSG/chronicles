import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function DocumentData(id?: string) {
  if (id == null) {
    let { data: documents, error } = await supabase
      .from("documents")
      .select("*")
      .order("date", { ascending: true });

    return documents;
  } else {
    let { data: documents, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", parseInt(id));

    return documents;
  }
}

export async function DocumentSearch(title?: string, documentType?: string) {
  title == "" || title == null ? (title = undefined) : (title = "%" + title + "%");
  documentType == "" || documentType == null ? (documentType = undefined) : null;

  if (title != undefined && documentType != undefined) {
    let { data: documents } = await supabase
      .from("documents")
      .select("*")
      .eq("document_type", documentType)
      .ilike("title", title)
      .order("date", { ascending: true });

    return documents;
  }

  if (title != undefined) {
    let { data: documents } = await supabase
      .from("documents")
      .select("*")
      .ilike("title", title)
      .order("date", { ascending: true });

    return documents;
  }

  if (documentType != undefined) {
    let { data: documents } = await supabase
      .from("documents")
      .select("*")
      .eq("document_type", documentType)
      .order("date", { ascending: true });

    return documents;
  }

  let { data: documents } = await supabase
    .from("documents")
    .select("*")
    .order("date", { ascending: true });

  return documents;
}
