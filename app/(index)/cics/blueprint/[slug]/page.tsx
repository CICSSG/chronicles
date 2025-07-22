"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { eastCampus } from "../page";
import CampusDirectory from "@/components/campus-directory";

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
    // if (!slug) return;
    // PublicEventDataByID(slug).then(({ documents }) => {
    //   setDocument(documents && documents[0] ? documents[0] : null);
    //   setIsLoaded(true);
    // });
    setDocument(eastCampus.find((doc) => String(doc.id) === slug) || null);
    // console.log("slug", slug);
    // console.log(eastCampus);
    // eastCampus.find((doc) => console.log(doc));
    console.log(
      "document",
      eastCampus.find((doc) => String(doc.id) === slug) || null,
    );
  }, [slug]);

  useEffect(() => {
    setIsLoaded(true);
  }, [document]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl lg:flex-row">
      <div className="flex w-full flex-col gap-8 xl:rounded-xl xl:bg-white/80 xl:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <a
              className="flex flex-row items-center text-center text-xl font-semibold text-black/60 hover:text-black/80 xl:text-left"
              href="/cics/blueprint"
            >
              {<ChevronLeftIcon className="inline size-8" />} Back to Blueprint
            </a>
            <h1 className="text-center text-2xl xl:text-left">
              {isLoaded ? (
                document.name
              ) : (
                <div className="flex flex-row gap-2">
                  <div className="skeleton float-left mr-4 h-4 w-60"></div>
                </div>
              )}
            </h1>
          </div>
          <div className="block">
            {isLoaded ? (
              <div
                className="hero h-fit min-h-96 place-items-start overflow-hidden rounded-3xl"
                style={{
                  backgroundImage: `url(${document.image})`,
                }}
              >
                <div className="hero-overlay bg-linear-230 from-black/0 from-30% via-black/20 via-50% to-black/75 to-80%"></div>
                <div className="hero-content text-neutral-content my-auto">
                  <div className="max-w-sm">
                    <p className="mb-5 text-justify font-normal">
                      {document.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2">
                <div className="skeleton float-left mr-4 h-80 w-full"></div>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">Location</h1>
              </div>
              <div className="collapse-content text-justify text-lg font-normal">
                {document && document.location}
              </div>
            </div>
          </div>

          {/* Services */}
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

          {/* Organization */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">Organizations</h1>
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
        </div>

        <hr className="border-2 border-black/40" />
        <CampusDirectory />
      </div>
    </div>
  );
}
