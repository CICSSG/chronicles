"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlatesData } from "@/components/admin/documents-data";
import { createClient } from "@supabase/supabase-js";
import { CreatePopup } from "@/components/admin/alert-fragment";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
  const [contactData, setContactData] = useState<any | null>(null);
  const [contactDialog, setContactDialog] = useState(false);

  useEffect(() => {
    if (contactData != null) {
      setContactDialog(true);
    } else {
      setContactDialog(false);
      setContactData(null);
    }
  }, [contactData]);

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

  const handleCloseDialog = () => {
    setContactData(null);
  };

  const handleViewDocument = (name: string, type: string) => {
    if (type == "GVG") {
      if (name == "Governor") {
        const data = document.governor;
        data.position = "Governor";

        setContactData(data);
      }

      if (name == "Vice Governor") {
        const data = document.vice_governor;
        data.position = "Vice Governor";

        setContactData(data);
      }
    }

    if (type == "Executive") {
      const data = document.directorate.find(
        (item: { name?: string }) => item.name && item.name.includes(name),
      );

      setContactData(data);
    }

    if (type == "Legislative") {
      const data = document.legislative.find(
        (item: { name?: string }) => item.name && item.name.includes(name),
      );
      data.position = "Legislative Councilor";

      setContactData(data);
    }

    if (type == "Junior Officer") {
      const data = document.junior_officers.find(
        (item: { name?: string }) => item.name && item.name.includes(name),
      );

      setContactData(data);
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

      <Dialog
        open={contactDialog}
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
                        {contactData?.name}
                      </DialogTitle>
                      <p className="text-sm/2 font-normal text-black/50">
                        {contactData?.position}
                      </p>
                      <div className="mt-2">
                        <ul className="list list-inside list-disc">
                          {contactData?.contact_info ? null : (
                            <li className="text-sm text-black/80">
                              No data found.
                            </li>
                          )}
                          {contactData?.contact_info?.map(
                            (
                              data: { platform: string; link: string },
                              i: number,
                            ) => (
                              <li
                                key={i}
                                className="text-sm font-semibold text-black/80"
                              >
                                {data.platform}:{" "}
                                {data.platform == "Email" ||
                                data.platform == "Contact Number" ? (
                                  <span
                                    className="font-normal text-black/80"
                                  >
                                    {data.link}
                                  </span>
                                ) : (
                                  <a
                                    href={data.link}
                                    target="_blank"
                                    className="font-normal text-blue-400 hover:text-blue-300"
                                  >
                                    {data.link}
                                  </a>
                                )}
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
