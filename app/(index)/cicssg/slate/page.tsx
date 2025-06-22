"use client";
import { SlateCard } from "@/components/documentcard";
import { PublicSlateData } from "@/components/public-documents-data";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { Suspense, useEffect, useState } from "react";

const Slate = () => {
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [pagination, setPagination] = useState(1);

  const pages = [
    (page ?? 1) <= 3
      ? 1
      : (page ?? 1) > pagination - 2
        ? pagination - 4
        : (page ?? 1) - 2,
    (page ?? 1) <= 3
      ? 2
      : (page ?? 1) > pagination - 2
        ? pagination - 3
        : (page ?? 1) - 1,
    (page ?? 1) <= 3
      ? 3
      : (page ?? 1) > pagination - 2
        ? pagination - 2
        : (page ?? 1),
    (page ?? 1) <= 3
      ? 4
      : (page ?? 1) > pagination - 2
        ? pagination - 1
        : (page ?? 1) + 1,
    (page ?? 1) <= 3
      ? 5
      : (page ?? 1) > pagination - 2
        ? pagination
        : (page ?? 1) + 2,
  ];

  useEffect(() => {
    PublicSlateData(page).then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  }, [page]);

  return (
    <div className="flex flex-col gap-4 *:rounded-2xl xl:rounded-xl xl:bg-white/80 xl:p-8">
      <div className="flex grow-1 basis-0 flex-col gap-4 text-black/90 *:rounded-2xl *:bg-white/80 *:xl:bg-neutral-300 *:px-8 *:py-8 *:xl:shadow-xl">
        <div className="bg-[url(/images/noise.png)]">
          <h2 className="text-3xl font-bold">CICSSG Slate</h2>
        </div>
      </div>
      <div className="flex grow-3 basis-0 flex-col gap-4 bg-neutral-300 bg-[url(/images/noise.png)] xl:p-6 text-black/80">
        <Suspense>
          <div className="no-scrollbar grid grid-cols-1 gap-4 overflow-x-auto *:rounded-xl *:bg-white/80 *:p-4 xl:grid-cols-2 3xl:grid-cols-3">
            {/* Card */}
            {documents?.map((data) => (
              <SlateCard
                key={data.id}
                AcademicYear={data.academic_year}
                URL={"/cicssg/slate/" + data.id}
                ImageLink={
                  data.image ? data.image : "https://i.imgur.com/6pP0o7C.png"
                }
              />
            ))}
          </div>

          <div className="join">
            {pagination >= 2 && (
              <>
                <Link
                  className="join-item btn"
                  href={""}
                  passHref
                  shallow
                  replace
                  onClick={() => setPage(pages[0])}
                >
                  {pages[0]}
                </Link>
                <Link
                  className="join-item btn"
                  href={""}
                  passHref
                  shallow
                  replace
                  onClick={() => setPage(pages[1])}
                >
                  {pages[1]}
                </Link>
              </>
            )}
            {pagination >= 3 && (
              <Link
                className="join-item btn"
                href={""}
                passHref
                shallow
                replace
                onClick={() => setPage(pages[2])}
              >
                {pages[2]}
              </Link>
            )}
            {pagination >= 4 && (
              <Link
                className="join-item btn"
                href={""}
                passHref
                shallow
                replace
                onClick={() => setPage(pages[3])}
              >
                {pages[3]}
              </Link>
            )}
            {pagination >= 5 && (
              <Link
                className="join-item btn"
                href={""}
                passHref
                shallow
                replace
                onClick={() => setPage(pages[4])}
              >
                {pages[4]}
              </Link>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Slate;
