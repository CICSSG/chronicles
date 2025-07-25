"use client";
import { PublicEventDataByID } from "@/components/public-documents-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default function Page() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";
  const [isLoaded, setIsLoaded] = useState(false);
  const [document, setDocument] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;
    PublicEventDataByID(slug).then(({ documents }) => {
      setDocument(documents && documents[0] ? documents[0] : null);
      setIsLoaded(true);
    });
  }, [slug]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl lg:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-100 *:px-6 *:py-8 *:shadow-xl">
        <div className="rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8">
          <Link
            href={"/events"}
            className="flex flex-row gap-3 align-middle text-3xl font-bold"
          >
            <ChevronLeftIcon className="size-9" /> Back to Events
          </Link>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8 text-lg">
          {isLoaded ? (
            document && (
              <>
                <h1 className="text-3xl font-extrabold text-black/90">
                  {document.title}
                </h1>
                <hr className="rounded-2xl border-2 font-bold text-black/40" />

                <p>{document.date}</p>
                <p>{document.academic_year}</p>
              </>
            )
          ) : (
            <>
              <div className="skeleton h-8 w-full"></div>
              <hr className="rounded-2xl border-2 font-bold text-black/40" />
              <div className="skeleton h-6 w-1/2"></div>
              <div className="skeleton h-6 w-full"></div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8 text-lg">
          <h1 className="text-3xl font-extrabold text-black/80">Highlights</h1>
          <hr className="rounded-2xl border-2 font-bold text-black/40" />

          {isLoaded ? (
            document && (
              <>
                {/* {document.expenses && (
                  <h2>
                    Expenses:{" "}
                    <span className="font-bold text-black/80">
                      ₱{document.expenses}
                    </span>
                  </h2>
                )} */}
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
            )
          ) : (
            <>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-8 text-lg">
          <h1 className="text-3xl font-extrabold text-black/80">
            Project Heads
          </h1>
          <hr className="rounded-2xl border-2 font-bold text-black/40" />

          {isLoaded ? (
            document && (
              <>
                {document.project_heads.map((data: { name: string }) => (
                  <p>{data.name}</p>
                ))}
              </>
            )
          ) : (
            <>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
            </>
          )}
        </div>
      </div>
      <div className="3xl:grow-3 flex grow-2 basis-0 flex-col gap-8 rounded-2xl bg-neutral-300 bg-[url(/images/noise.png)] p-6 text-black/80 xl:p-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl xl:text-left">
            About the event:
          </h1>
          <div className="block">
            {isLoaded ? (
              <Image
                src={document && document.image}
                alt=""
                width={300}
                height={300}
                className="float-left my-auto mr-0 mb-4 h-fit w-full rounded-2xl border border-black/60 object-contain md:mr-4 md:mb-0 md:w-2/5"
              />
            ) : (
              <div className="flex flex-row gap-2">
                <div className="skeleton float-left aspect-square w-80 mr-4"></div>
                <div className="flex flex-col w-full gap-4">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            )}
            <p className="text-justify text-lg/10 font-normal">
              {document && document.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 text-xl font-normal">
            Location: {isLoaded ? (
              document && document.location
            ) : (
              <div className="skeleton h-4 w-72"></div>
            )}
          </div>
        </div>

        <hr className="border-2 text-black/40" />
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl xl:text-left">Gallery:</h1>
          <div className="3xl:grid-cols-4 mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {isLoaded ? (
              document && document.images.length != 0 && (
              <>
                {document.images.map((data: string) => (
                  <Image
                    src={data}
                    alt=""
                    width={300}
                    height={300}
                    className="h-full rounded-xl border border-black/70 object-cover"
                  />
                ))}
              </>
            )
            ) : (
              <>
              <div className="skeleton h-32 w-60"></div>
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-32 w-full"></div>
              </>
            )}
          </div>

            {document && document.album_link && (
              <Link href={document.album_link} target="_blank" className="mx-auto px-4 py-2 bg-black/90 text-white/90 rounded-lg hover:bg-black/80">View full album</Link>
            )}
        </div>
      </div>
    </div>
  );
}
