"use client";
import { PublicEventDataByID } from "@/components/public-documents-data";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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

  console.log(document);
  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl md:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-100 *:px-6 *:py-8 *:shadow-xl">
        <div className="rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8">
          <Link
            href={"/events"}
            className="flex flex-row gap-3 align-middle text-3xl font-bold hover:text-black"
          >
            <ArrowLeftCircleIcon className="size-8" /> Back to Events
          </Link>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8 text-lg">
          {document && (
            <>
              <h1 className="text-3xl font-extrabold text-black/90">
                {document.title}
              </h1>
              <hr className="rounded-2xl border-2 font-bold text-blue-300" />

              <p>{document.date}</p>
              <p>{document.academic_year}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8 text-lg">
          <h1 className="text-3xl font-extrabold text-black/80">Highlights</h1>
          <hr className="rounded-2xl border-2 font-bold text-blue-300" />

          {document && (
            <>
              {document.expenses && (
                <h2>
                  Expenses:{" "}
                  <p className="font-bold text-black/80">
                    ₱{document.expenses}
                  </p>
                </h2>
              )}
              {document.highlights.map(
                (data: { highlight: string; description: string }) => (
                  <p>
                    <span className="font-bold text-black/80">
                      {data.highlight}
                    </span>{" "}
                    - {data.description}
                  </p>
                ),
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8 text-lg">
          <h1 className="text-3xl font-extrabold text-black/80">
            Project Heads
          </h1>
          <hr className="rounded-2xl border-2 font-bold text-blue-300" />

          {document && (
            <>
              {document.project_heads.map((data: { name: string }) => (
                <p>{data.name}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex grow-2 3xl:grow-3 basis-0 flex-col gap-8 rounded-2xl bg-neutral-300 bg-[url(/images/noise.png)] p-6 xl:p-12 text-black/80">
        <div className="flex flex-col 2xl:flex-row gap-4">
          <Image
            src={document && document.image}
            alt=""
            width={300}
            height={300}
            className="rounded-2xl border border-black/60 w-full h-fit my-auto object-contain"
          />
          <div className="my-8 flex flex-col justify-between gap-3">
            <h1 className="text-3xl text-center xl:text-left">About the event:</h1>
            <p className="text-justify text-lg font-normal">
              {document && document.description}
            </p>
            <div className="text-xl font-normal">
              Location: {document && document.location}
            </div>
          </div>
        </div>

        <hr className="border-2"/>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-center xl:text-left">Gallery:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 mx-auto">
            {document && document.images.length != 0 && (
              <>
                {document.images.map((data: string) => (
                  <Image 
                    src={data}
                    alt=""
                    width={300}
                    height={300}
                    className="border border-black/70 rounded-xl object-cover h-full"
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
