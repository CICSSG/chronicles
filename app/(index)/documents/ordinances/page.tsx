import DocumentCard from "@/components/documentcard";
import NavDocuments from "@/components/nav-documents";
import React from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function Ordinances() {
  let { data: documents, error } = await supabase
    .from("documents")
    .select("*")
    .eq("document_type", "ordinance");

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl md:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-300 *:px-6 *:py-8 *:shadow-xl">
        <div className="bg-[url(/images/noise.png)]">
          <h2 className="text-3xl font-bold">
            Documents <br /> Archive
          </h2>
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg *:font-bold">
          <NavDocuments />
        </div>
      </div>
      <div className="grid grow-3 basis-0 grid-cols-1 gap-4 bg-neutral-300 bg-[url(/images/noise.png)] p-6 text-black/80 *:rounded-xl *:bg-white/80 *:p-4 lg:grid-cols-2 xl:grid-cols-3">
        {/* Card */}
        {documents?.map((data) => (
          <DocumentCard
            key={data.id}
            Title={data.title}
            Date={data.date}
            URL={"/documents/executive-orders/" + data.id}
            Description={data.description}
            Author={data.author}
          />
        ))}
      </div>
    </div>
  );
}
