"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeftCircleIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { imgurUpload } from "@/utils/imgur-upload";
import clsx from "clsx";
import { createJuniorOfficerPOST, deleteJuniorOfficerPOST, editJuniorOfficerPOST } from "@/app/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function JuniorOfficerOverview({ document }: { document: any }) {
  const [createOfficerForm, setCreateOfficerForm] = useState(false);
  const [editOfficerForm, setEditOfficerForm] = useState(false);
  const [editOfficerName, setEditOfficerName] = useState("");
  const [editOfficerPosition, setEditOfficerPosition] = useState("");
  const [deleteForm, setDeleteForm] = useState(false);
  const [deleteDocumentId, setDeleteDocumentId] = useState("");
  const [deleteDocumentName, setDeleteDocumentName] = useState("");

  const [base64Image, setBase64Image] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (base64Image) {
      imgurUpload(base64Image)
        .then((result) => {
          setImage(`${result.data.link}`);
        })
        .catch((err) => {
          // handle error if needed
        });
    }
  }, [base64Image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage("");
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBase64Image(reader.result as string);
    reader.readAsDataURL(file);
  };

  function handleEditDocument(name: string) {
    const junior_officers = document?.junior_officers || [];
    
    const filtered = junior_officers.filter((officer: { name: string }) => officer.name == name);

    setEditOfficerForm(true);
    setBase64Image("");
    setEditOfficerName(filtered[0]?.name || "");
    setEditOfficerPosition(filtered[0]?.position || "");
    setImage(filtered[0]?.image || "");
  }

  const handleDeleteDocument = (id: string, name: string, open: boolean) => {
    setDeleteDocumentId(id);
    setDeleteDocumentName(name);
    setDeleteForm(open);
  };

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
          <h1 className="text-4xl font-bold">Junior Officers</h1>
          <p className="text-lg font-semibold">
            Currently editing academic year {document && document.academic_year}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        <Button
          onClick={() => {
            setImage("");
            setBase64Image("");
            setCreateOfficerForm(true);
          }}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-500"
        >
          New Junior Officer
        </Button>
      </div>

      <div className="relative flex min-h-fit basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table">
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th></th>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            {document &&
              document.junior_officers &&
              document.junior_officers.map((officer: any, index: number) => (
                <tr key={index} className="w-full">
                  <td>
                    <img
                      src={
                        officer.image != ""
                          ? officer.image
                          : "https://placehold.co/400/black/FFF?text=No+image."
                      }
                      alt=""
                      className="size-16"
                    />
                  </td>
                  <td className="text-nowrap">{officer.name}</td>
                  <td className="text-nowrap">{officer.position}</td>
                  <td className="grid grid-flow-row grid-cols-2 gap-2 text-center font-semibold *:my-auto *:rounded-xl *:px-4 *:py-2">
                    <Button
                      onClick={() => handleEditDocument(officer.name)}
                      className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteDocument(document.id, officer.name, true)
                      }
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

      {/* New Officer */}
      <Dialog
        open={createOfficerForm}
        onClose={() => setCreateOfficerForm(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (image == "" && base64Image != "") {
                    alert("Image was not uploaded yet, try again");
                  } else {
                    const formData = new FormData(e.currentTarget);
                    formData.set("image", image ?? null);
                    createJuniorOfficerPOST(formData);
                    setBase64Image("");
                    setImage("");
                    setCreateOfficerForm(false);
                  }
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
                        Create junior officer
                      </DialogTitle>

                      <div className="flex w-full flex-col gap-4">
                        <div className="hidden w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Input
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={document && document.id}
                              name="id"
                            ></Input>
                          </Field>
                        </div>
                      </div>

                      <div className="mt-4 flex w-full flex-col gap-4">
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Name
                            </Label>
                            <Input
                              name="name"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Position
                            </Label>
                            <Input
                              name="position"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Image
                            </Label>
                            <Input
                              type="file"
                              onChange={handleImageChange}
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              accept=".png,.jpg,.jpeg"
                            />
                          </Field>
                          <div className="text-xs font-bold">
                            {!image && !base64Image ? (
                              <div className="text-red-400">No image</div>
                            ) : !image && base64Image ? (
                              <div className="text-amber-300">
                                Image uploading
                              </div>
                            ) : image && !base64Image ? (
                              <div className="text-amber-300">
                                Upload to update image
                              </div>
                            ) : (
                              <div className="text-green-300">
                                Image uploaded
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setCreateOfficerForm(false)}
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

      {/* Edit Officer */}
      <Dialog
        open={editOfficerForm}
        onClose={() => setEditOfficerForm(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (image == "" && base64Image != "") {
                    alert("Image was not uploaded yet, try again");
                  } else {
                    const formData = new FormData(e.currentTarget);
                    formData.set("id_name", editOfficerName ?? null);
                    formData.set("image", image ?? null);
                    editJuniorOfficerPOST(formData);
                    setBase64Image("");
                    setImage("");
                    setEditOfficerForm(false);
                  }
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
                        Edit junior officer
                      </DialogTitle>

                      <div className="flex w-full flex-col gap-4">
                        <div className="hidden w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Input
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={document && document.id}
                              name="id"
                            ></Input>
                          </Field>
                        </div>
                      </div>

                      <div className="mt-4 flex w-full flex-col gap-4">
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Name
                            </Label>
                            <Input
                              name="name"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                              defaultValue={editOfficerName}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Position
                            </Label>
                            <Input
                              name="position"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                              defaultValue={editOfficerPosition}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Image
                            </Label>
                            <Input
                              type="file"
                              onChange={handleImageChange}
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              accept=".png,.jpg,.jpeg"
                            />
                          </Field>
                          <div className="text-xs font-bold">
                            {!image && !base64Image ? (
                              <div className="text-red-400">No image</div>
                            ) : !image && base64Image ? (
                              <div className="text-amber-300">
                                Image uploading
                              </div>
                            ) : image && !base64Image ? (
                              <div className="text-amber-300">
                                Upload to update image
                              </div>
                            ) : (
                              <div className="text-green-300">
                                Image uploaded
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setEditOfficerForm(false)}
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

      {/* Delete Form */}
      <Dialog
        open={deleteForm}
        onClose={setDeleteForm}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form action={deleteJuniorOfficerPOST}>
                <input
                  type="text"
                  name="id"
                  className="hidden"
                  defaultValue={deleteDocumentId}
                />
                <input
                  type="text"
                  name="name"
                  className="hidden"
                  defaultValue={deleteDocumentName}
                />
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="size-6 text-red-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Delete junior officer
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete{" "}
                          <span className="font-bold">
                            {deleteDocumentName}
                          </span>
                          ?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={() => handleDeleteDocument("", "", false)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => handleDeleteDocument("", "", false)}
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
