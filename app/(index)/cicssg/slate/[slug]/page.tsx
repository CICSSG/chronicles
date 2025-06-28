"use client";
import { PublicSlateDataByID } from "@/components/public-documents-data";
import {
  ArrowLeftCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavCICSSG from "@/components/nav-cicssg";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const LegislativeResponsibilities = {
  position: "Legislative Council",
  responsibilities: [
    "Writes and passes ordinances that promotes the general welfare of the college and its students of the college and its students and other concerns.",
    "Oversees the implementation of ordinances for college projects.",
  ],
};

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
  const [viewResponsibilities, setViewResponsibilities] = useState(false);
  const [responsibilitiesData, setResponsibilitiesData] = useState<any | null>(
    null,
  );

  useEffect(() => {
    if (!slug) return;
    PublicSlateDataByID(slug).then(({ documents }) => {
      setDocument(documents && documents[0] ? documents[0] : null);
    });
  }, [slug]);

  const handleCloseDialog = () => {
    setResponsibilitiesData(null);
  };

  const handleViewResponsibilitiesGovVgov = (position: string) => {
    if (position == "Governor") {
      setResponsibilitiesData(document.governor);
    }

    if (position == "Vice Governor") {
      setResponsibilitiesData(document.vice_governor);
    }
  };

  const handleViewResponsibilitiesLegislative = () => {
    setResponsibilitiesData(LegislativeResponsibilities);
  };

  const handleViewResponsibilitiesDirectorate = (position: string) => {
    const data = document.directorate.find(
      (item: { position?: string }) =>
        item.position && item.position.includes(position),
    );

    setResponsibilitiesData(data);
  };

  const handleViewResponsibilitiesJuniorOfficer = (position: string) => {
    const data = document.junior_officers.find(
      (item: { position?: string }) =>
        item.position && item.position.includes(position),
    );

    setResponsibilitiesData(data);
  };

  useEffect(() => {
    if (responsibilitiesData != null) {
      setViewResponsibilities(true);
    } else {
      setViewResponsibilities(false);
      setResponsibilitiesData(null);
    }
  }, [responsibilitiesData]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl xl:flex-row">
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
          <hr className="rounded-2xl border-2 font-bold text-black/40" />
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
                className="aspect-square w-50 rounded-2xl border-2 border-black/70 shadow-lg"
              />
              <h1 className="text-xl font-bold">{document.adviser.position}</h1>
              <p className="text-xl font-medium">{document.adviser.name}</p>
            </div>
          </div>
        )}

        {/* Gov & VGov */}
        <div className="flex w-full flex-col gap-8">
          <h1 className="w-full text-center text-4xl">
            Governor & <br className="xl:hidden" /> Vice Governor
          </h1>
          <div className="flex flex-col justify-evenly gap-8 xl:flex-row">
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
                  className="aspect-square w-50 rounded-2xl border-2 border-black/70 shadow-lg"
                />
                <h1 className="text-xl font-bold">Governor</h1>
                <p className="text-xl font-medium">{document.governor.name}</p>
                {document.governor.responsibilities?.length > 0 && (
                  <Button
                    onClick={() =>
                      handleViewResponsibilitiesGovVgov("Governor")
                    }
                    className="rounded-xl bg-black/80 px-3 py-1.5 text-white hover:cursor-pointer hover:bg-black/70"
                  >
                    Responsibilities
                  </Button>
                )}
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
                  className="aspect-square w-50 rounded-2xl border-2 border-black/70 shadow-lg"
                />
                <h1 className="text-xl font-bold">Vice Governor</h1>
                <p className="text-xl font-medium">
                  {document.vice_governor.name}
                </p>
                {document.vice_governor.responsibilities?.length > 0 && (
                  <Button
                    onClick={() =>
                      handleViewResponsibilitiesGovVgov("Vice Governor")
                    }
                    className="rounded-xl bg-black/80 px-3 py-1.5 text-white hover:cursor-pointer hover:bg-black/70"
                  >
                    Responsibilities
                  </Button>
                )}
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
            <div className="grid grid-cols-1 justify-evenly gap-10 md:grid-cols-2 xl:grid-cols-3">
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
                        className="aspect-square w-50 rounded-2xl border-2 border-black/70 shadow-lg"
                      />
                      <h1 className="text-center text-xl font-bold">
                        {data.position}
                      </h1>
                      <p className="text-center text-xl font-medium">
                        {data.name}
                      </p>
                      <Button
                        onClick={() =>
                          handleViewResponsibilitiesDirectorate(data.position)
                        }
                        className="mt-auto rounded-xl bg-black/80 px-3 py-1.5 text-white hover:cursor-pointer hover:bg-black/70"
                      >
                        Responsibilities
                      </Button>
                    </div>
                  ),
                )}
            </div>
          </div>
        )}

        {/* Legislative Council */}
        {document && document.legislative && (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 xl:flex-row">
              {document.legislative.length > 0 ? (
                <>
                  <h1 className="flex flex-row gap-4 text-4xl">
                    Legislative Council{" "}
                    <span className="hidden xl:block">-</span>
                  </h1>
                  <Button
                    onClick={() => handleViewResponsibilitiesLegislative()}
                    className="rounded-xl bg-black/80 px-3 py-1.5 text-white hover:cursor-pointer hover:bg-black/70"
                  >
                    Responsibilities
                  </Button>
                </>
              ) : (
                <h1 className="flex flex-row gap-4 text-4xl">
                  Legislative Council
                </h1>
              )}
            </div>
            {document.legislative.length == 0 && (
              <span className="text-center text-xl font-normal">
                {NO_DATA_MESSAGE}
              </span>
            )}
            <div className="grid grid-cols-1 justify-evenly gap-10 md:grid-cols-2 xl:grid-cols-3">
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
                        className="aspect-square w-50 rounded-2xl border-2 border-black/70 shadow-lg"
                      />
                      <h1 className="text-center text-xl font-bold">
                        Legislative Councilor
                      </h1>
                      <p className="text-center text-xl font-medium">
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
            <div className="grid grid-cols-1 justify-evenly gap-10 *:basis-[20%] md:grid-cols-2 xl:grid-cols-3">
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
                        className="aspect-square w-50 rounded-2xl border-2 border-black/70 shadow-lg"
                      />
                      <h1 className="text-center text-xl font-bold">
                        {data.position}
                      </h1>
                      <p className="mt-auto text-center text-xl font-medium">
                        {data.name}
                      </p>
                      <Button
                        onClick={() =>
                          handleViewResponsibilitiesJuniorOfficer(data.position)
                        }
                        className="rounded-xl bg-black/80 px-3 py-1.5 text-white hover:cursor-pointer hover:bg-black/70"
                      >
                        Responsibilities
                      </Button>
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
                    className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10"
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
                    <div className="collapse-content flex flex-col gap-3 text-sm">
                      {committeeData.responsibilities.length > 0 && (
                        <div className="flex flex-col gap-3">
                          <h1 className="text-xl font-semibold">
                            Responsibilities
                          </h1>
                          <ul className="list list-inside list-disc text-lg font-normal">
                            {committeeData.responsibilities.map(
                              (data: string, i: number) => (
                                <li key={i}>{data}</li>
                              ),
                            )}
                          </ul>
                          <hr />
                        </div>
                      )}
                      <h1 className="text-xl font-semibold">Committees</h1>
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

      <Dialog
        open={viewResponsibilities}
        onClose={() => handleCloseDialog()}
        className="relative z-10"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-dvh flex-col items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                      <InformationCircleIcon
                        aria-hidden="true"
                        className="size-6 text-blue-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        {responsibilitiesData?.position}
                      </DialogTitle>
                      <div className="mt-2">
                        <ul className="list list-inside list-disc">
                          {responsibilitiesData?.responsibilities ? null : (
                            <li className="text-sm text-black/80">
                              No data found.
                            </li>
                          )}
                          {responsibilitiesData?.responsibilities?.map(
                            (data: string, i: number) => (
                              <li key={i} className="text-sm text-black/80">
                                {data}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => handleCloseDialog()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
