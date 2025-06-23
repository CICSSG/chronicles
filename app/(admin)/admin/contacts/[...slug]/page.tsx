"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlatesData } from "@/components/admin/documents-data";
import { createClient } from "@supabase/supabase-js";
import { CreatePopup } from "@/components/admin/alert-fragment";
import { Button } from "@headlessui/react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function Page() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug
        : "";

  const [document, setDocument] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;
    SlatesData(slug[0]).then(({ documents }) => {
      setDocument(documents && documents[0] ? documents[0] : null);
    });

    const taskListener = supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "slate" },
        (payload) => {
          SlatesData(slug[0]).then(({ documents }) => {
            setDocument(documents && documents[0] ? documents[0] : null);
            CreatePopup("Data updated");
          });
          // console.log("Change received!", payload);
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, [slug]);

  const handleViewDocument = (name: string, type: string) => {
    if (type == "GVG") {
      if (name == "Governor") {
      }

      if (name == "Vice Governor") {
      }
    }

    if (type == "Executive") {
    }

    if (type == "Legislative") {
    }

    if (type == "Junior Officer") {
    }
  };
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Contacts</h1>
          <p className="text-lg font-semibold">
            View contact info for current & previous officers
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        {/* <div className="flex flex-row">
              <div className="w-full max-w-2xs px-4">
                <Field>
                  <Label className="text-sm/6 font-medium text-white">Title</Label>
                  <Input
                    name="title"
                    className={clsx(
                      "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                    )}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title ?? ""}
                  />
                </Field>
              </div>
    
              <button
                type="button"
                onClick={handleSearch}
                className="mx-2 mt-auto rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white hover:cursor-pointer hover:bg-white/10"
              >
                <Search />
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="mx-2 mt-auto rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-nowrap text-white hover:cursor-pointer hover:bg-white/10"
              >
                Clear Filter
              </button>
            </div> */}
      </div>

      <div className="relative flex min-h-fit grow-1 basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            <tr className="w-full">
              <td className="text-nowrap">{document?.governor.name}</td>
              <td className="max-w-2xl truncate">Governor</td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Button
                  onClick={() => handleViewDocument("Governor", "GVG")}
                  className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  View Info
                </Button>
              </td>
            </tr>
            <tr className="w-full">
              <td className="text-nowrap">{document?.vice_governor.name}</td>
              <td className="max-w-2xl truncate">Vice Governor</td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Button
                  onClick={() => handleViewDocument("Vice Governor", "GVG")}
                  className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  View Info
                </Button>
              </td>
            </tr>
            {document?.directorate.map(
              (data: { name: string; position: string }, i: number) => (
                <tr className="w-full" key={i}>
                  <td className="text-nowrap">{data?.name}</td>
                  <td className="max-w-2xl truncate">{data?.position}</td>
                  <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                    <Button
                      onClick={() =>
                        handleViewDocument(data?.name, "Executive")
                      }
                      className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                    >
                      View Info
                    </Button>
                  </td>
                </tr>
              ),
            )}

            {document?.legislative.map((data: { name: string }, i: number) => (
              <tr className="w-full" key={i}>
                <td className="text-nowrap">{data?.name}</td>
                <td className="max-w-2xl truncate">Legislative Councilor</td>
                <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Button
                    onClick={() =>
                      handleViewDocument(data?.name, "Legislative")
                    }
                    className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    View Info
                  </Button>
                </td>
              </tr>
            ))}

            {document?.junior_officers.map(
              (data: { name: string; position: string }, i: number) => (
                <tr className="w-full" key={i}>
                  <td className="text-nowrap">{data?.name}</td>
                  <td className="max-w-2xl truncate">{data?.position}</td>
                  <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                    <Button
                      onClick={() =>
                        handleViewDocument(data?.name, "Junior Officer")
                      }
                      className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                    >
                      View Info
                    </Button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
