"use client";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlatesData, SulongData, SulongSearch } from "@/components/admin/documents-data";
import { parseAsInteger, useQueryState } from "nuqs";
import { CreatePopup } from "@/components/admin/alert-fragment";

export default function Contacts() {
  const pathname = usePathname();
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [pagination, setPagination] = useState(1);

  const setCurrentPageHandler = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    SulongData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  }, []);

  const handleViewDocument = (id: string) => {
    redirect(`/admin/sulong/${id}`);
  };

  useEffect(() => {
      SulongSearch(
        page ?? undefined,
      ).then(({ documents, pagination }) => {
        setDocuments(documents);
        setPagination(pagination);
      });
    }, [page]);
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Sulong Pioneers</h1>
          <p className="text-lg font-semibold">
            Access & reply to all anonymous submissions
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom"></div>

      <div className="relative flex min-h-fit grow-1 basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        {!documents && (
          <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black/30">
            No Data Found.
          </div>
        )}
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th>Submission ID</th>
              <th className="mr-auto">Recent Message</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            {documents?.map((data, i) => {
              return (
                <tr className="w-full" key={i}>
                  <th className="text-nowrap">Pioneer-{data.id}</th>
                  <td className="text-nowrap overflow-hidden text-ellipsis w-6xl inline-block">
                    {data.messages[data.messages.length - 1]?.from == "You" ? "Anonymous": "You"}: {data.messages[data.messages.length - 1]?.content}
                  </td>
                  <td className="text-nowrap">
                    {new Date(data.updated_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                    <Button
                      onClick={() => handleViewDocument(data.id)}
                      className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                    >
                      Open
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="join">
        {pagination >= 2 && (
          <>
            <Link
              className="join-item btn"
              href={{
                pathname: pathname,
                query: {
                  page: (page ?? 1) <= 3 ? 1 : (page ?? 1) - 2,
                },
              }}
              passHref
              shallow
              replace
              onClick={() =>
                setCurrentPageHandler((page ?? 1) <= 3 ? 1 : (page ?? 1) - 2)
              }
            >
              {(page ?? 1) <= 3 ? "1" : (page ?? 1) - 2}
            </Link>
            <Link
              className="join-item btn"
              href={{
                pathname: pathname,
                query: {
                  page: (page ?? 1) <= 3 ? 2 : (page ?? 1) - 1,
                },
              }}
              passHref
              shallow
              replace
              onClick={() =>
                setCurrentPageHandler((page ?? 1) <= 3 ? 2 : (page ?? 1) - 1)
              }
            >
              {(page ?? 1) <= 3 ? "2" : (page ?? 1) - 1}
            </Link>
          </>
        )}
        {pagination >= 3 && (
          <Link
            className="join-item btn"
            href={{
              pathname: pathname,
              query: {
                page: (page ?? 1) <= 3 ? 3 : page,
              },
            }}
            passHref
            shallow
            replace
            onClick={() =>
              setCurrentPageHandler((page ?? 1) <= 3 ? 3 : (page ?? 1))
            }
          >
            {(page ?? 1) <= 3 ? "3" : page}
          </Link>
        )}
        {pagination >= 4 && (
          <Link
            className="join-item btn"
            href={{
              pathname: pathname,
              query: {
                page: (page ?? 1) <= 3 ? 4 : (page ?? 1) + 1,
              },
            }}
            passHref
            shallow
            replace
            onClick={() =>
              setCurrentPageHandler((page ?? 1) <= 3 ? 4 : (page ?? 1) + 1)
            }
          >
            {(page ?? 1) <= 3 ? "4" : (page ?? 1) + 1}
          </Link>
        )}
        {pagination >= 5 && (
          <Link
            className="join-item btn"
            href={{
              pathname: pathname,
              query: {
                page: (page ?? 1) <= 3 ? 5 : (page ?? 1) + 2,
              },
            }}
            passHref
            shallow
            replace
            onClick={() =>
              setCurrentPageHandler((page ?? 1) <= 3 ? 5 : (page ?? 1) + 2)
            }
          >
            {(page ?? 1) <= 3 ? "5" : (page ?? 1) + 2}
          </Link>
        )}
      </div>
    </div>
  );
}
