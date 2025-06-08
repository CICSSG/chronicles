"use client";
import { Button } from "@headlessui/react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlatesData } from "@/components/admin/documents-data";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function LegislativeOverview({ document }: { document: any }) {
  function handleViewDocument(number: string) {}

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <Link
        href={"/admin/officers/" + document?.id}
        className="flex flex-row items-center gap-2 text-xl"
      >
        <ArrowLeftCircleIcon className="size-6" /> Back to Overview
      </Link>
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Slate</h1>
          <p className="text-lg font-semibold">
            Currently editing academic year {document && document.academic_year}
          </p>
        </div>
      </div>

      <div className="relative flex min-h-fit basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table">
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th></th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            {document &&
              document.legislative &&
              document.legislative.map((officer: any, index: number) => (
                <tr key={index} className="w-full">
                  <td><img src={officer.image} alt="" className="size-16"/></td>
                  <td className="text-nowrap">{officer.name}</td>
                  <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                    <Button
                      onClick={() => handleViewDocument("0")}
                      className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleViewDocument("0")}
                      className="basis-0 bg-red-400 text-nowrap text-black hover:cursor-pointer hover:bg-red-300"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
