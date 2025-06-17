"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Select,
  Textarea,
} from "@headlessui/react";
import { DocumentIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { FacultyData, FacultySearch } from "@/components/admin/documents-data";
import {
  createAnnouncementPOST,
  createFacultyPOST,
  deleteAnnouncementPOST,
  deleteFacultyPOST,
  editAnnouncementPOST,
  editFacultyPOST,
} from "@/app/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { parseAsInteger, useQueryState } from "nuqs";

import { createClient } from "@supabase/supabase-js";
import { imgurUpload } from "@/utils/imgur-upload";
import DynamicInputFieldsSpecialization from "@/components/admin/dynamic-input-field-specialization";
import { CreatePopup } from "@/components/admin/alert-fragment";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function Faculty() {
  const pathname = usePathname();
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [title, setTitle] = useQueryState("title");
  const [createForm, setCreateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [editFormId, setEditFormId] = useState("");
  const [editDocument, setEditDocument] = useState<any | null>(null);
  const [deleteDocumentId, setDeleteDocumentId] = useState("");
  const [deleteDocumentName, setDeleteDocumentName] = useState("");
  const [pagination, setPagination] = useState(1);
  const [base64Image, setBase64Image] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBase64Image(reader.result as string);
    reader.readAsDataURL(file);
  };

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

  const setCurrentPageHandler = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    FacultyData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });

    const taskListener = supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "faculty" },
        (payload) => {
          FacultyData().then(({ documents, pagination }) => {
            setDocuments(documents ?? null);
            setPagination(pagination);
          });
          // console.log("Change received!", payload);
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    editFormId != "" ? setEditForm(true) : setEditForm(false);
  }, [editDocument]);

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (image == "" && base64Image != "") {
      alert("Image was not uploaded yet, try again");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await createFacultyPOST(formData);
      setBase64Image("");
      setImage("");
      setCreateForm(false);
      if (result.success) {
        CreatePopup("Successfully created faculty member");
      } else {
        CreatePopup(result.message || "Failed to create faculty");
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (image == "" && base64Image != "") {
      alert("Image was not uploaded yet, try again");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await editFacultyPOST(formData)
      setEditForm(false);
      setBase64Image("");
      setImage("");
      handleEditDocument("");
      if (result.success) {
        CreatePopup("Successfully deleted faculty member");
      } else {
        CreatePopup(result.message || "Failed to create faculty");
      }
    }
  };
  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (image == "" && base64Image != "") {
      alert("Image was not uploaded yet, try again");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await deleteFacultyPOST(formData);
      setBase64Image("");
      setImage("");
      setCreateForm(false);
      if (result.success) {
        CreatePopup("Successfully deleted faculty member");
      } else {
        CreatePopup(result.message || "Failed to create faculty");
      }
    }
  };

  const handleEditDocument = (id: string) => {
    if (id == "") {
      setImage("");
      setEditFormId(id);
      setEditForm(false);
    } else {
      FacultyData(id).then(({ documents, pagination }) => {
        setEditDocument(documents);
        setEditFormId(id);
      });
    }
  };

  const handleDeleteDocument = (id: string, name: string, open: boolean) => {
    setDeleteDocumentId(id);
    setDeleteDocumentName(name);
    setDeleteForm(open);
  };

  const clearFilters = () => {
    setPage(1);
    setTitle(null);

    FacultyData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
      setPagination(pagination);
    });
  };

  useEffect(() => {
    FacultySearch(title ?? undefined, page ?? undefined).then(
      ({ documents }) => {
        setDocuments(documents ?? null);
      },
    );
  }, [page, title]);

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Faculty</h1>
          <p className="text-lg font-semibold">Edit Faculty</p>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        <Button
          onClick={() => {
            setImage("");
            setBase64Image("");
            setCreateForm(true);
          }}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-500"
        >
          Create Faculty Member
        </Button>
        <Button
          onClick={() => {
            CreatePopup("Testtt");
          }}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-500"
        >
          Create Faculty Member
        </Button>

        <div className="flex flex-row">
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

          {/* <button
            type="button"
            onClick={handleSearch}
            className="mx-2 mt-auto rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white hover:cursor-pointer hover:bg-white/10"
          >
            <Search />
          </button> */}
          <button
            type="button"
            onClick={clearFilters}
            className="mx-2 mt-auto rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-nowrap text-white hover:cursor-pointer hover:bg-white/10"
          >
            Clear Filter
          </button>
        </div>
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
              <th></th>
              <th>Name</th>
              <th>Department</th>
              <th>Work Type</th>
              <th>Specializations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            {documents?.map((data, i) => (
              <tr className="w-full" key={i}>
                <td></td>
                <td className="text-nowrap">{data.name}</td>
                <td className="text-nowrap">{data.department}</td>
                <td className="">{data.work_type}</td>
                <td className="">{data.specialization.length}</td>
                <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Button
                    onClick={() => handleEditDocument(data.id)}
                    className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteDocument(data.id, data.title, true)
                    }
                    className="grow-1 basis-0 bg-red-400 text-black"
                  >
                    Delete
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

      {/* Create Form */}
      <Dialog open={createForm} onClose={() => setCreateForm(false)}>
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
                  handleCreateSubmit(e);
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
                        New Faculty Member
                      </DialogTitle>
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
                              Department
                            </Label>
                            <Select
                              name="department"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                "scheme-light",
                              )}
                            >
                              <option value="" disabled selected>
                                ---Select Department---
                              </option>
                              <option value="CS">CS</option>
                              <option value="IT">IT</option>
                            </Select>
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Work Type
                            </Label>
                            <Select
                              name="work_type"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                "scheme-light",
                              )}
                            >
                              <option value="" disabled selected>
                                ---Select Work Type---
                              </option>
                              <option value="Full-time">Full Time</option>
                              <option value="Part-time">Part Time</option>
                            </Select>
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
                            ) : (
                              <div className="text-green-300">
                                Image uploaded
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-col items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Specialization/s
                            </Label>
                            <DynamicInputFieldsSpecialization
                              data={
                                editDocument && editDocument[0].project_heads
                              }
                            />
                          </Field>
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
                    onClick={() => setCreateForm(false)}
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
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(e);
                }}
              >
                <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:size-10">
                      <DocumentIcon
                        aria-hidden="true"
                        className="size-6 text-amber-600"
                      />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Edit Faculty Member
                      </DialogTitle>

                      <div className="flex w-full flex-col gap-4">
                        <div className="hidden w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Input
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={editDocument && editDocument[0].id}
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
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={
                                editDocument && editDocument[0].name
                              }
                              name="name"
                            ></Input>
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Department
                            </Label>
                            <Select
                              name="department"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                "scheme-light",
                              )}
                              defaultValue={editDocument && editDocument[0].department}
                            >
                              <option value="" disabled selected>
                                ---Select Department---
                              </option>
                              <option value="CS">CS</option>
                              <option value="IT">IT</option>
                            </Select>
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Work Type
                            </Label>
                            <Select
                              name="work_type"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                "scheme-light",
                              )}
                              defaultValue={editDocument && editDocument[0].work_type}
                            >
                              <option value="" disabled selected>
                                ---Select Work Type---
                              </option>
                              <option value="Full-time">Full Time</option>
                              <option value="Part-time">Part Time</option>
                            </Select>
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
                                "scheme-light",
                              )}
                              accept=".png,.jpg,.jpeg"
                              // defaultValue={
                              //   editDocument && editDocument[0].image
                              // }
                            />
                          </Field>
                          <div className="text-xs font-bold">
                            {!image && !base64Image ? (
                              <div className="text-red-400">
                                Upload to change image
                              </div>
                            ) : !image && base64Image ? (
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

                        <div className="w-full max-w-md">
                          <Field className="flex flex-col items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Specialization/s
                            </Label>
                            <DynamicInputFieldsSpecialization
                              data={
                                editDocument && editDocument[0].specialization
                              }
                            />
                          </Field>
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
                    onClick={() => handleEditDocument("")}
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
              <form onSubmit={(e) => handleDeleteSubmit(e)}>
                <input
                  type="text"
                  name="id"
                  className="hidden"
                  defaultValue={deleteDocumentId}
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
                        Delete Faculty Member
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
