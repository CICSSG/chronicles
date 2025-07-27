"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import CampusDirectory from "@/components/campus-directory";
import { CampusInfo } from "@/components/public-documents-data";

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

  const [eastDocuments, setEastDocuments] = useState<any[] | undefined>(
    undefined,
  );
  const [westDocuments, setWestDocuments] = useState<any[] | undefined>(
    undefined,
  );

  useEffect(() => {
    CampusInfo().then(({ east_documents, west_documents }) => {
      setEastDocuments(east_documents ?? undefined);
      setWestDocuments(west_documents ?? undefined);
    });
  }, [slug]);

  useEffect(() => {
    setDocument(eastDocuments?.find((doc) => String(doc.id) === slug) || null);
  }, [eastDocuments]);

  useEffect(() => {
    setIsLoaded(true);
  }, [document]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl lg:flex-row">
      <div className="flex w-full flex-col gap-8 xl:rounded-xl xl:bg-white/80 xl:p-8">
        <div className="flex flex-col gap-4">
          <div className="items-left flex flex-col justify-between gap-4 lg:flex-row lg:gap-0">
            <a
              className="flex flex-row items-center text-center text-xl font-semibold text-black/60 hover:text-black/80 xl:text-left"
              href="/cics/blueprint"
            >
              {<ChevronLeftIcon className="inline size-8" />} Back to Blueprint
            </a>
            <h1 className="text-center text-2xl xl:text-left">
              {isLoaded ? (
                document?.name
              ) : (
                <div className="flex flex-row gap-2">
                  <div className="skeleton float-left mr-4 h-4 w-60"></div>
                </div>
              )}
            </h1>
          </div>
          <div className="block">
            {isLoaded ? (
              <>
                <div
                  className="hero h-fit min-h-96 place-items-start overflow-hidden rounded-3xl shadow-lg border-2 border-gray-400"
                  style={{
                    backgroundImage: `url(${document && document.image && document.image.length > 2 ? document.image : "/images/NoImage.png"})`,
                  }}
                >
                  {/* <div className="hero-overlay bg-linear-230 from-white/0 from-30% via-black/1 via-50% to-black/0 to-80%"></div> */}
                  <div className="hero-content text-neutral-content my-auto">
                    <div className="max-w-sm"></div>
                  </div>
                </div>

                <pre className="my-5 text-justify font-normal text-wrap text-lg font-black/80">
                  {document?.description}
                </pre>
              </>
            ) : (
              <div className="flex flex-row gap-2">
                <div className="skeleton float-left mr-4 h-80 w-full"></div>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-2xl">Location:</h1>
            <Link
              href={(document && document.location) || ""}
              target="_blank"
              className="text-md/0 rounded-full bg-black/10 px-4 py-1 font-semibold hover:bg-black/20"
            >
              Google Maps
            </Link>
          </div>

          {/* Services */}
          {document && document.services && document.services.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
                <input type="checkbox" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                  <h1 className="text-2xl font-bold">Services Offered</h1>
                </div>
                <div className="collapse-content text-sm">
                  <ul className="list list-inside list-disc gap-4 *:text-lg">
                    {document &&
                      document.services.map((data: string, i: number) => (
                        <li key={i} className="text-justify font-normal">
                          {data}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Organization */}
          {document &&
            document.organization &&
            document.organization.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
                  <input type="checkbox" name="my-accordion-2" />
                  <div className="collapse-title font-semibold">
                    <h1 className="text-2xl font-bold">Offices & Organizations</h1>
                  </div>
                  <div className="collapse-content text-sm">
                    <ul className="list list-inside list-disc gap-4 *:text-lg">
                      {document &&
                        document.organization.map((data: string, i: number) => (
                          <li key={i} className="text-justify font-normal">
                            {data}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>

        <hr className="border-2 border-black/40" />
        <CampusDirectory
          isLoaded={isLoaded}
          east_campus={eastDocuments}
          west_campus={westDocuments}
        />
      </div>
    </div>
  );
}
