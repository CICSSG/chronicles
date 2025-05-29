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

        return documents
    } else {
        let { data: documents, error } = await supabase
        .from("documents")
        .select("*")
        .eq('id', parseInt(id))

        return documents
    }
}