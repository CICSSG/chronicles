"use client";
import {
  Button,
} from "@headlessui/react";
import Link from "next/link";
import React from "react";

export default function Documents() {
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Announcements</h1>
          <p className="text-lg font-semibold">Edit Announcements</p>
        </div>
      </div>

      <div className="relative flex min-h-fit grow-1 basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th className="grow">Type</th>
              <th className="ml-auto">Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            <tr className="w-full">
                <th className="text-nowrap grow">East Campus</th>
                <td className="ml-auto flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Link
                  href={"/admin/blueprint/east_campus"}
                    className="bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    Edit
                  </Link>
                </td>
              </tr>

              <tr className="w-full">
                <th className="text-nowrap grow">West Campus</th>
                <td className="ml-auto flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Link
                  href={"/admin/blueprint/west_campus"}
                    className="bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    Edit
                  </Link>
                </td>
              </tr>

              <tr className="w-full">
                <th className="text-nowrap grow">Panimola Schedule</th>
                <td className="ml-auto flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Link
                  href={"/admin/blueprint/panimola"}
                    className="bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
