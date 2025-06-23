"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
} from "@headlessui/react";
import { DocumentIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { SlatesData, SlatesSearch } from "@/components/admin/documents-data";
import {
  createEventPOST,
  createSlatePOST,
  deleteEventPOST,
  deleteSlatePOST,
  editEventPOST,
} from "@/app/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { parseAsInteger, useQueryState } from "nuqs";

import { createClient } from "@supabase/supabase-js";
import { imgurUpload } from "@/utils/imgur-upload";
import DynamicInputFieldsProjectHead from "@/components/admin/dynamic-input-field-project-head";
import DynamicInputFieldsHighlights from "@/components/admin/dynamic-input-field-highlights";
import { CreatePopup } from "@/components/admin/alert-fragment";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function Contacts() {
  const pathname = usePathname();
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [title, setTitle] = useQueryState("title");
  const [createForm, setCreateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [deleteDocumentId, setDeleteDocumentId] = useState("");
  const [deleteDocumentName, setDeleteDocumentName] = useState("");
  const [pagination, setPagination] = useState(1);
  const [base64Image, setBase64Image] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (base64Image) {
      imgurUpload(base64Image)
        .then((result) => {
          console.log(result);
          setImage(`${result.data.link}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [base64Image]);

  const setCurrentPageHandler = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    SlatesData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });

    const taskListener = supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "slate" },
        (payload) => {
          SlatesData().then(({ documents, pagination }) => {
            setDocuments(documents ?? null);
            setPagination(pagination);
            CreatePopup("Data updated");
          });
          // console.log("Change received!", payload);
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, []);

  const handleViewDocument = (id: string) => {
    redirect(`/admin/contacts/${id}`);
  };

  const handleDeleteDocument = (id: string, name: string, open: boolean) => {
    setDeleteDocumentId(id);
    setDeleteDocumentName(name);
    setDeleteForm(open);
  };

  const clearFilters = () => {
    setPage(1);
    setTitle(null);

    SlatesData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  };

  useEffect(() => {
    SlatesSearch(title ?? undefined, page ?? undefined).then(
      ({ documents }) => {
        setDocuments(documents ?? null);
      },
    );
  }, [page, title]);

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (image == "" && base64Image != "") {
      CreatePopup("Image was not uploaded yet. Please wait", "error");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await createSlatePOST(formData);
      setBase64Image("");
      setImage("");
      setCreateForm(false);
      if (result.success) {
        CreatePopup("Successfully created slate", "success");
      } else {
        CreatePopup("Failed to create slate", "error");
      }
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const result = await deleteSlatePOST(formData);
    setBase64Image("");
    setImage("");
    setDeleteForm(false);
    if (result.success) {
      CreatePopup("Successfully deleted slate", "success");
    } else {
      CreatePopup("Failed to delete slate", "error");
    }
  };
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Contacts</h1>
          <p className="text-lg font-semibold">View contact info for current & previous officers</p>
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
        {!documents && (
          <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black/30">
            No Data Found.
          </div>
        )}
        <table className="table">
          {/* head */}
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th>School Year</th>
              <th>Adviser</th>
              <th>Governor</th>
              <th>Vice Governor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            {documents?.map((data, i) => (
              <tr className="w-full" key={i}>
                <th className="text-nowrap">
                  Academic Year {data.academic_year}
                </th>
                <td className="text-nowrap">{data.adviser.name}</td>
                <td className="max-w-2xl truncate">{data.governor.name}</td>
                <td className="max-w-2xl truncate">
                  {data.vice_governor.name}
                </td>
                <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Button
                    onClick={() => handleViewDocument(data.id)}
                    className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    View Info
                  </Button>
                </td>
              </tr>
            ))}
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
