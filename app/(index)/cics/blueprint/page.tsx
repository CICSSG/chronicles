"use client";
import CampusDirectory from "@/components/campus-directory";
import { CampusInfo } from "@/components/public-documents-data";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Blueprint() {
  const [isLoaded, setIsLoaded] = useState(false);
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
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 *:xl:rounded-xl *:xl:bg-white/80 *:xl:p-8">
      <div className="flex flex-col gap-10 text-justify">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Pioneer's Blueprint</h1>
          <p className="text-justify text-lg font-normal">
            Naliligaw ka na ba? kawawa ka naman bui
          </p>
          <hr />
        </div>

        {/* Timeline */}
        <div
          tabIndex={0}
          className="collapse-arrow bg-base-100 border-base-300 collapse border"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title font-semibold text-2xl"><h1>Panimola Timeline</h1></div>
          <div className="collapse-content text-sm">
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              <li>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-start mb-10 text-black/65 md:text-end">
                  <h1 className="font-mono text-black/80">August 1, 2025</h1>
                  <h1 className="text-lg font-bold text-black/80">
                    Unang mangyayari
                  </h1>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  animi facere excepturi sed corporis incidunt illum! Quam
                  veritatis quasi laudantium eveniet culpa, error, cum,
                  voluptatem aspernatur dolore repellendus et provident!
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end text-black/65 md:mb-10">
                  <h1 className="font-mono text-black/80">August 2, 2025</h1>
                  <h2 className="text-lg font-bold text-black/80">
                    Pangalawang ganap
                  </h2>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Atque explicabo porro molestias maxime hic eveniet illum,
                  incidunt maiores, accusantium quisquam, exercitationem beatae
                  repudiandae totam sed perferendis aliquam facere consectetur
                  labore?
                </div>
                <hr />
              </li>
            </ul>
          </div>
        </div>

        {/* Campus Map */}
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl">Campus Map</h1>
          <Image
            src="/images/campus-map.jpg"
            width={1000}
            height={500}
            alt=""
            className="h-fit w-full rounded-xl border-2 border-black/40 object-cover shadow-lg"
          />

          <CampusDirectory
            isLoaded={isLoaded}
            east_campus={eastDocuments}
            west_campus={westDocuments}
          />
        </div>
      </div>
    </div>
  );
}
