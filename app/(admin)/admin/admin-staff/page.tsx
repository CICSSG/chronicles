"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { DocumentIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import {
  AdminStaffData,
  AdminStaffSearch,
} from "@/components/admin/documents-data";
import { parseAsInteger, useQueryState } from "nuqs";

import { createClient } from "@supabase/supabase-js";
import { imgurUpload } from "@/utils/imgur-upload";
import Image from "next/image";
import DynamicInputFieldsStaff from "@/components/admin/dynamic-input-field-staff";
import { CreatePopup } from "@/components/admin/alert-fragment";
import { editAdminStaffPOST } from "@/app/actions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export interface AdminStaffDocumentData {
  id: number;
  dean: {
    name: string;
    image: string;
  };
  associate_dean: {
    name: string;
    image: string;
  };
  staff: {
    name: string;
    image: string;
    position: string;
  }[];
}

export default function AdminStaff() {
  const [id, setId] = useState(0);
  // const [createForm, setCreateForm] = useState(false);
  // const [deleteForm, setDeleteForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [documents, setDocuments] = useState<AdminStaffDocumentData | null>(
    null,
  );

  const [deanBase64Image, setDeanBase64Image] = useState<string>("");
  const [deanImage, setDeanImage] = useState<string>("");
  const [associateDeanBase64Image, setAssociateDeanBase64Image] =
    useState<string>("");
  const [associateDeanImage, setAssociateDeanImage] = useState<string>("");

  const handleDeanImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDeanBase64Image(reader.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (deanBase64Image) {
      CreatePopup("Image uploading");
      imgurUpload(deanBase64Image)
        .then((result) => {
          setDeanImage(`${result.data.link}`);
          CreatePopup("Image upload successful!", "success");
        })
        .catch((err) => {
          CreatePopup("Image failed to upload. Try Again", "error");
          // handle error if needed
        });
    }
  }, [deanBase64Image]);

  const handleAssocDeanImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAssociateDeanBase64Image(reader.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (associateDeanBase64Image) {
      CreatePopup("Image uploading");
      imgurUpload(associateDeanBase64Image)
        .then((result) => {
          setAssociateDeanImage(`${result.data.link}`);
          CreatePopup("Image upload successful!", "success");
        })
        .catch((err) => {
          CreatePopup("Image failed to upload. Try Again", "error");
          // handle error if needed
        });
    }
  }, [associateDeanBase64Image]);

  useEffect(() => {
    AdminStaffData().then(({ documents, pagination }) => {
      setDocuments(documents && documents[0] ? documents[0] : null);
      setDeanImage(documents && documents[0].dean.image);
      setId(documents && documents[0].id);
      setAssociateDeanImage(documents && documents[0].associate_dean.image);
    });

    const taskListener = supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "admin_staff" },
        (payload) => {
          AdminStaffData().then(({ documents, pagination }) => {
            setDocuments(documents && documents[0] ? documents[0] : null);
            setDeanImage(documents && documents[0].dean.image);
            setAssociateDeanImage(
              documents && documents[0].associate_dean.image,
            );
            setId(documents && documents[0].id);
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

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    formData.set("id", id?.toString() ?? "");
    formData.set("dean_image", deanImage);
    formData.set("assoc_dean_image", associateDeanImage);
    const result = await editAdminStaffPOST(formData);

    if (result.success) {
      CreatePopup("Successful edit", "success");
      setEditForm(false);
    } else {
      CreatePopup("Failed to edit, try again", "error");
    }
  };

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Admin & Staff</h1>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        <Button
          onClick={() => {
            setEditForm(true);
          }}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-amber-600 px-3 py-1.5 font-semibold text-white hover:cursor-pointer hover:bg-amber-500"
        >
          Edit Admin & Staff
        </Button>

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
              <th></th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            <tr className="w-full">
              <td>
                <Image
                  src={
                    documents && documents.dean.image !== ""
                      ? documents.dean.image
                      : "/images/NoImage.png"
                  }
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-xl border-2 border-black/60"
                />
              </td>
              <td className="text-nowrap">
                {documents && documents.dean.name}
              </td>
              <td className="text-nowrap">Dean</td>
            </tr>

            <tr className="w-full">
              <td>
                <Image
                  src={
                    documents && documents.associate_dean.image !== ""
                      ? documents.associate_dean.image
                      : "/images/NoImage.png"
                  }
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-xl border-2 border-black/60"
                />
              </td>
              <td className="text-nowrap">
                {documents && documents.associate_dean.name}
              </td>
              <td className="text-nowrap">Associate Dean</td>
            </tr>

            {documents?.staff.map((data, i) => (
              <tr className="w-full">
                <td>
                  <Image
                    src={data.image !== "" ? data.image : "/images/NoImage.png"}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-xl border-2 border-black/60"
                  />
                </td>
                <td className="text-nowrap">{data.name}</td>
                <td className="text-nowrap">{data.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      <Dialog open={editForm} onClose={() => setEditForm(false)}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(e);
                }}
              >
                <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <DocumentIcon
                        aria-hidden="true"
                        className="size-6 text-green-600"
                      />
                    </div>
                    <div className="mt-3 w-full overflow-y-scroll text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Edit Event
                      </DialogTitle>

                      <div className="mt-4 flex w-full flex-row gap-6">
                        <div className="flex flex-col gap-4">
                          <div className="hidden w-full">
                            <Field className="flex flex-row items-center gap-4">
                              <Input
                                className={clsx(
                                  "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                )}
                                defaultValue={documents?.id}
                                name="id"
                              ></Input>
                            </Field>
                          </div>
                        </div>

                        <div className="mt-4 flex w-full grow basis-0 flex-col gap-4">
                          <div className="w-full">
                            <Field className="flex flex-row items-center gap-4">
                              <Label className="text-sm/6 font-medium text-black">
                                Dean
                              </Label>
                              <Input
                                name="dean_name"
                                className={clsx(
                                  "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                )}
                                defaultValue={documents?.dean.name}
                                required
                              />
                            </Field>
                          </div>

                          <div className="w-full">
                            <Field className="flex flex-row items-center gap-4">
                              <Label className="text-sm/6 font-medium text-nowrap text-black">
                                Dean Image
                              </Label>
                              <Input
                                type="file"
                                onChange={handleDeanImageChange}
                                className={clsx(
                                  "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                )}
                                accept=".png,.jpg,.jpeg"
                              />
                            </Field>
                            <div className="text-xs font-bold">
                              {!deanImage && !deanBase64Image ? (
                                <div className="text-red-400">No image</div>
                              ) : !deanImage && deanBase64Image ? (
                                <div className="text-amber-300">
                                  Image uploading
                                </div>
                              ) : (
                                <div className="text-green-300">
                                  Image uploaded
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="w-full">
                            <Field className="flex flex-row items-center gap-4">
                              <Label className="text-sm/6 font-medium text-nowrap text-black">
                                Associate Dean
                              </Label>
                              <Input
                                name="assoc_dean_name"
                                type="text"
                                className={clsx(
                                  "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  "scheme-light",
                                )}
                                defaultValue={documents?.associate_dean.name}
                              />
                            </Field>
                          </div>

                          <div className="w-full">
                            <Field className="flex flex-row items-center gap-4">
                              <Label className="text-sm/6 font-medium text-nowrap text-black">
                                Associate Dean Image
                              </Label>
                              <Input
                                type="file"
                                onChange={handleAssocDeanImageChange}
                                className={clsx(
                                  "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                )}
                                accept=".png,.jpg,.jpeg"
                              />
                            </Field>
                            <div className="text-xs font-bold">
                              {!associateDeanImage &&
                              !associateDeanBase64Image ? (
                                <div className="text-red-400">No image</div>
                              ) : !associateDeanImage &&
                                associateDeanBase64Image ? (
                                <div className="text-amber-300">
                                  Image uploading
                                </div>
                              ) : (
                                <div className="text-green-300">
                                  Image uploaded
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex grow basis-0 flex-col gap-4">
                            <div className="w-full">
                              <Field className="flex flex-col items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Staff
                                </Label>
                                <DynamicInputFieldsStaff
                                  data={documents?.staff}
                                />
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-amber-500 sm:ml-3 sm:w-auto"
                  >
                    Edit File
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setEditForm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
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
