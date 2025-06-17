"use client";
import {DocumentCard, ExecutiveCard} from "@/components/documentcard";
import NavDocuments from "@/components/nav-documents";
import React, { Suspense, useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { PublicDocumentData } from "@/components/public-documents-data";
import Link from "next/link";

function Resolutions() {
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
    PublicDocumentData("resolution", page).then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  }, [page]);

  return (
    <Suspense>
          <div className="grid grid-cols-1 gap-4 *:rounded-xl *:bg-white/80 *:p-4 xl:grid-cols-2 3xl:grid-cols-3">
          {/* <div className="grid grid-cols-1 gap-4 *:rounded-xl *:bg-gradient-to-bl *:from-white/80 *:via-white/80 *:to-blue-200 *:via-70% *:p-4 lg:grid-cols-2 xl:grid-cols-3"> */}
            {/* Card */}
            {documents?.map((data) => (
              <ExecutiveCard
                key={data.id}
                Title={data.title}
                Date={data.date}
                URL={data.link}
                Description={data.description}
                Author={data.author}
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
  );
}

export default Resolutions;
