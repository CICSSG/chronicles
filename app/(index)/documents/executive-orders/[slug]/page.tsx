import NavDocuments from "@/components/nav-documents";
import { createClient } from "@supabase/supabase-js";
import { LinkIcon } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = typeof slug === "string" ? parseInt(slug) : 0;

  let { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .order("date", { ascending: true });

  let data = documents && documents[0];
  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl md:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-300 *:px-6 *:py-8 *:shadow-xl">
        <div className="bg-[url(/images/noise.png)]">
          <div>
            <h1 className="font-black/80 text-2xl font-bold">{data.title}</h1>
            <h2 className="text-md font-medium">
              {data.date
                ? new Date(data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </h2>
            <h2 className="text-md font-medium">Authored By: {data.author}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg *:font-bold">
          <NavDocuments />
        </div>
      </div>
      <div className="grid grow-3 basis-0 grid-cols-1 gap-4 bg-neutral-200 bg-[url(/images/noise.png)] p-6 text-black/80 *:rounded-xl *:p-4">
        <div className="flex flex-col gap-4">
          <img
            src={data.image}
            alt=""
            className="w-1/3 rounded-2xl border border-black/50 shadow-lg"
          />
          <h2 className="text-sm font-medium">
            <span className="font-bold">Post Link:</span>{" "}
            <a
              target="_blank"
              href={data.link}
              className="text-blue-800 underline"
            >
              {data.link}
            </a>
          </h2>
          <p className="font-medium text-lg">{data.description}</p>
        </div>

        {data.external_links != null ? (
          <div>
            <h3 className="text-lg font-bold">External Links:</h3>
            <ul>
              {data.external_links.map(
                (data: { link: string; name: string }, i: number) => (
                  <li key={i} className="flex flex-row items-center gap-2">
                    <LinkIcon />
                    <a
                      target="_blank"
                      href={data.link}
                      className="text-lg text-blue-800 underline"
                    >
                      {data.name}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
