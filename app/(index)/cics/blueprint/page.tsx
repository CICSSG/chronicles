"use client";
import CampusDirectory from "@/components/campus-directory";
import { CampusInfo, PanimolaTimelineData } from "@/components/public-documents-data";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Blueprint() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [panimolaTimeline, setPanimolaTimeline] = useState<any[] | undefined>(
    undefined,
  );
  const [eastDocuments, setEastDocuments] = useState<any[] | undefined>(
    undefined,
  );
  const [westDocuments, setWestDocuments] = useState<any[] | undefined>(
    undefined,
  );

  useEffect(() => {
    PanimolaTimelineData().then(({ documents }) => {
      setPanimolaTimeline(documents ?? undefined);
    });

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
            Are you lost bro? Don't worry, we got you covered! The Pioneer's Blueprint is your guide to navigating the DLSUD campus. It provides essential information about the campus layout, facilities, and services available to students. Whether you're looking for classrooms, libraries, or student services, this blueprint will help you find your way around with ease.
          </p>
          <hr />
        </div>

        {/* Timeline */}
        <div
          tabIndex={0}
          className="collapse-arrow bg-base-100 collapse border border-black/15 hover:scale-101"
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-2xl font-semibold">
            <h1>Panimola Schedule</h1>
          </div>
          <div className="collapse-content text-sm">
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              {panimolaTimeline?.map((data, i) =>
                
                i % 2 === 0 ? (
                  <li key={i}>
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
                    <div className="timeline-start mb-10 font-normal text-black/65 md:text-end">
                      <h1 className="font-mono text-black/80">
                        {data.date
                          ? new Date(data.date).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          : ""}
                      </h1>
                      <h1 className="text-lg font-bold text-black/80">
                        {data.title}
                      </h1>
                      {data.description}
                    </div>
                    <hr />
                  </li>
                ) : (
                  <li key={i}>
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
                    <div className="timeline-end font-normal text-black/65 md:mb-10">
                      <h1 className="font-mono text-black/80">
                        {data.date
                          ? new Date(data.date).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          : ""}
                      </h1>
                      <h2 className="text-lg font-bold text-black/80">
                        {data.title}
                      </h2>
                      {data.description}
                    </div>
                    <hr />
                  </li>
                ),
              )}
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
