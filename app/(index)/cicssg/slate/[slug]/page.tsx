"use client";
import { PublicSlateDataByID } from "@/components/public-documents-data";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavCICSSG from "@/components/nav-cicssg";
import Image from "next/image";

export default function Page() {
  const NO_DATA_MESSAGE = "No data available";
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
    PublicSlateDataByID(slug).then(({ documents }) => {
      setDocument(documents && documents[0] ? documents[0] : null);
    });
  }, [slug]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl md:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-100 *:px-6 *:py-8 *:shadow-xl">
        <div className="bg-[url(/images/noise.png)]">
          <Link
            href={"/cicssg/slate"}
            className="flex flex-row gap-3 align-middle text-3xl font-bold hover:text-black"
          >
            <ArrowLeftCircleIcon className="size-8" /> Back to Slate
          </Link>
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg">
          <h1 className="text-3xl font-extrabold text-black/90">
            Official Slate
          </h1>
          <hr className="rounded-2xl border-2 font-bold text-blue-300" />
          {document && (
            <>
              <p>Academic Year {document.academic_year}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 bg-[url(/images/noise.png)] text-lg *:font-bold">
          <NavCICSSG />
        </div>
      </div>
      <div className="flex grow-3 basis-0 flex-col gap-20 bg-neutral-100 bg-[url(/images/noise.png)] px-6 py-16 text-black/80">
        {/* Adviser */}
        {document && document.adviser.name && (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl">Adviser</h1>
            <div className="mx-auto flex flex-col items-center gap-2">
              <Image
                height={250}
                width={250}
                src={
                  document.adviser.image != ""
                    ? document.adviser.image
                    : "https://i.imgur.com/6pP0o7C.png"
                }
                alt=""
                className="aspect-square w-50 rounded-2xl border-2 border-blue-300 shadow-lg"
              />
              <h1 className="text-xl font-bold">{document.adviser.position}</h1>
              <p className="text-xl font-medium">{document.adviser.name}</p>
            </div>
          </div>
        )}

        {/* Gov & VGov */}
        <div className="flex w-full flex-col gap-8">
          <h1 className="w-full text-center text-4xl">
            Governor & <br className="xl:hidden"/> Vice Governor
          </h1>
          <div className="flex flex-col xl:flex-row justify-evenly gap-8">
            {document && document.governor && (
              <div className="flex flex-col items-center gap-2">
                <Image
                  height={250}
                  width={250}
                  src={
                    document.governor.image != ""
                      ? document.governor.image
                      : "https://i.imgur.com/6pP0o7C.png"
                  }
                  alt=""
                  className="aspect-square w-50 rounded-2xl border-2 border-blue-300 shadow-lg"
                />
                <h1 className="text-xl font-bold">Governor</h1>
                <p className="text-xl font-medium">{document.governor.name}</p>
              </div>
            )}
            {document && document.vice_governor && (
              <div className="flex flex-col items-center gap-2">
                <Image
                  height={250}
                  width={250}
                  src={
                    document.vice_governor.image != ""
                      ? document.vice_governor.image
                      : "https://i.imgur.com/6pP0o7C.png"
                  }
                  alt=""
                  className="aspect-square w-50 rounded-2xl border-2 border-blue-300 shadow-lg"
                />
                <h1 className="text-xl font-bold">Vice Governor</h1>
                <p className="text-xl font-medium">
                  {document.vice_governor.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Executive Board */}
        {document && document.directorate && (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl">Executive Board</h1>
            {document.directorate.length == 0 && (
              <span className="text-center text-xl font-normal">
                {NO_DATA_MESSAGE}
              </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 justify-evenly gap-10">
              {document &&
                document.directorate.map(
                  (
                    data: { image: string; position: string; name: string },
                    i: number,
                  ) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Image
                        height={250}
                        width={250}
                        src={
                          data.image != ""
                            ? data.image
                            : "https://i.imgur.com/6pP0o7C.png"
                        }
                        alt=""
                        className="aspect-square w-50 rounded-2xl border-2 border-blue-300 shadow-lg"
                      />
                      <h1 className="text-center text-xl font-bold">
                        {data.position}
                      </h1>
                      <p className="mt-auto text-center text-xl font-medium">
                        {data.name}
                      </p>
                    </div>
                  ),
                )}
            </div>
          </div>
        )}

        {/* Legislative Council */}
        {document && document.legislative && (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl">Legislative Council</h1>
            {document.legislative.length == 0 && (
              <span className="text-center text-xl font-normal">
                {NO_DATA_MESSAGE}
              </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 justify-evenly gap-10">
              {document &&
                document.legislative &&
                document.legislative.map(
                  (data: { image: string; name: string }, i: number) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Image
                        height={250}
                        width={250}
                        src={
                          data.image != ""
                            ? data.image
                            : "https://i.imgur.com/6pP0o7C.png"
                        }
                        alt=""
                        className="aspect-square w-50 rounded-2xl border-2 border-blue-300 shadow-lg"
                      />
                      <h1 className="text-center text-xl font-bold">
                        Legislative Councilor
                      </h1>
                      <p className="mt-auto text-center text-xl font-medium">
                        {data.name}
                      </p>
                    </div>
                  ),
                )}
            </div>
          </div>
        )}

        {/* Junior Officers */}
        {document && document.junior_officers && (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl">Junior Officers</h1>
            {document.junior_officers.length == 0 && (
              <span className="text-center text-xl font-normal">
                {NO_DATA_MESSAGE}
              </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 justify-evenly gap-10 *:basis-[20%]">
              {document &&
                document.junior_officers.map(
                  (
                    data: { image: string; position: string; name: string },
                    i: number,
                  ) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Image
                        src={
                          data.image != ""
                            ? data.image
                            : "https://i.imgur.com/6pP0o7C.png"
                        }
                        alt=""
                        height={250}
                        width={250}
                        className="aspect-square w-50 rounded-2xl border-2 border-blue-300 shadow-lg"
                      />
                      <h1 className="text-center text-xl font-bold">
                        {data.position}
                      </h1>
                      <p className="mt-auto text-center text-xl font-medium">
                        {data.name}
                      </p>
                    </div>
                  ),
                )}
            </div>
          </div>
        )}

        {/* Committees */}
        {document && document.committees && (
          <div className="mx-auto flex w-11/12 flex-col gap-8">
            <h1 className="text-center text-4xl">Committees</h1>
            {Object.keys(document.committees).length == 0 && (
              <span className="text-center text-xl font-normal">
                {NO_DATA_MESSAGE}
              </span>
            )}
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(document.committees).map(
                ([committeeName, committeeData]: [string, any], i: number) => (
                  <div
                    key={i}
                    className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-neutral-100 from-60% to-blue-50 transition duration-300 hover:scale-101 hover:from-blue-50"
                  >
                    <input type="checkbox" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">
                      <h1 className="text-2xl font-bold">
                        {committeeName} Committee
                      </h1>

                      <p className="text-lg font-bold">
                        Head/s:{" "}
                        {committeeData.head.map((data: string, i: number) => (
                          <span key={i} className="font-medium">
                            {data}
                            {i < committeeData.head.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="collapse-content text-sm">
                      <ul className="list *:text-lg">
                        {committeeData.committees.map(
                          (data: string, i: number) => (
                            <li className="list-row py-1.5 font-medium">
                              {i + 1}. {data}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
