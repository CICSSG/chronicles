"use client";
import { PublicEventDataByID } from "@/components/public-documents-data";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  const [document, setDocument] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;
    PublicEventDataByID(slug).then(({ documents }) => {
      setDocument(documents && documents[0] ? documents[0] : null);
    });
  }, [slug]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl md:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-100 *:px-6 *:py-8 *:shadow-xl">
        <div className="bg-[url(/images/noise.png)]">
          <Link
            href={"/events"}
            className="flex flex-row gap-3 align-middle text-3xl font-bold hover:text-black"
          >
            <ArrowLeftCircleIcon className="size-8" /> Back to Events
          </Link>
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg">
          {document && (
            <>
              <h1 className="text-3xl font-extrabold text-black/90">
                {document.title}
              </h1>
                    <hr className="rounded-2xl border-2 font-bold text-blue-300" />

              <h2>{document.date}</h2>
              <h2>{document.academic_year}</h2>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg">
          <h1 className="text-3xl font-extrabold text-black/80">Highlights</h1>
                <hr className="rounded-2xl border-2 font-bold text-blue-300" />

          {document && (
            <>
              {document.expenses && (
                <h2>
                  Expenses:{" "}
                  <span className="font-bold text-black/80">
                    ₱{document.expenses}
                  </span>
                </h2>
              )}
              {document.highlights.map((data: { highlight: string; description: string }) => (
                <h2>
                  <span className="font-bold text-black/80">
                    {data.highlight}
                  </span>{" "}
                  - {data.description}
                </h2>
              ))}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg">
          <h1 className="text-3xl font-extrabold text-black/80">
            Project Heads
          </h1>
                <hr className="rounded-2xl border-2 font-bold text-blue-300" />

          {document && (
            <>
              {document.project_heads.map((data: { name: string }) => (
                <h2>{data.name}</h2>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex grow-3 basis-0 flex-col gap-4 bg-neutral-300 bg-[url(/images/noise.png)] p-6 text-black/80">
        <div></div>
      </div>
    </div>
  );
}
