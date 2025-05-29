import { createClient } from "@supabase/supabase-js";

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

  let { data: documents, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .order('date', {ascending: true});

  let data = documents && documents[0]
  return (
    <div className="flex flex-col bg-neutral-100 rounded-2xl p-4 gap-8">
      <div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <h2 className="text-md font-medium">{data.date ? new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}</h2>
        <h2 className="text-md font-medium">Authored By: {data.author}</h2>
      </div>

      <div className="flex flex-col gap-4">
        <img src={data.image} alt="" className="w-1/3 rounded-2xl border border-black/50 shadow-lg" />
        <h2 className="text-md font-medium">Post Link: <a target="_blank" href={data.link} className="text-blue-800 underline">{data.link}</a></h2>
        <p>{data.description}</p>
      </div>

      {data.external_links != null ? (
        <div>
          <h3 className="text-md font-medium">External Links:</h3>
          <ul>
            {data.external_links.map((data: {link: string, type: string}, i: number) => (
              <li key={i}><a href={data.link}>{data.type}</a></li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
