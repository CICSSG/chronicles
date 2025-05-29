"use client";
import DocumentRadioDropdown from "@/components/admin/documenttypes";
import SearchBar from "@/components/admin/searchbar";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Textarea,
} from "@headlessui/react";
import { DocumentIcon } from "@heroicons/react/20/solid";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import DocumentData from "@/components/admin/documents-data";
import AddDynamicInputFields from "@/components/admin/dynamic-input-field";
import { createNewDocument, editDocumentPOST } from "@/app/actions";

export default function Documents() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [createForm, setCreateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState("");
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [editForm, setEditForm] = useState(false);
  const [editFormId, setEditFormId] = useState("");
  const [editDocument, setEditDocument] = useState<any | null>(null);

  const setCurrentPageHandler = (value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    DocumentData().then((docs) => {
      setDocuments(docs);
    });
  }, []);

  useEffect(() => {
    editFormId != "" ? setEditForm(true) : setEditForm(false);
  }, [editDocument]);

  const handleEditDocument = (id: string) => {
    if (id == "") {
      setEditFormId(id);
      setEditForm(false);
    } else {
      DocumentData(id).then((doc) => {
        setEditDocument(doc);
        setEditFormId(id);
      });
    }
  };

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-neutral-700">
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Documents</h1>
          <p className="text-lg font-semibold">Edit Documents</p>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        <Button
          onClick={() => setCreateForm(true)}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-500"
        >
          Create Document
        </Button>

        <div className="flex flex-row">
          <SearchBar />
          <DocumentRadioDropdown />
          <div className="mx-2 mt-auto rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black hover:cursor-pointer hover:bg-black/10">
            <Search />
          </div>
        </div>
      </div>

      <div className="flex min-h-fit grow-1 basis-0 flex-col justify-between overflow-x-auto rounded-2xl border p-4 shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-black">
            <tr className="border-b border-b-black">
              <th>Title</th>
              <th>Date</th>
              <th>Document Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-neutral-100">
            {documents?.map((data, i) => (
              <tr className="w-full" key={i}>
                <th className="text-nowrap">{data.title}</th>
                <td className="text-nowrap">
                  {data.date
                    ? new Date(data.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </td>
                <td className="text-nowrap">{data.document_type}</td>
                <td className="max-w-2xl truncate">{data.description}</td>
                <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                  <Button
                    onClick={() => handleEditDocument(data.id)}
                    className="grow-1 basis-0 bg-amber-200 text-black hover:cursor-pointer hover:bg-amber-100"
                  >
                    Edit
                  </Button>
                  <a href="" className="grow-1 basis-0 bg-red-400 text-black">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join ml-auto">
        <Link
          className="join-item btn"
          href={{
            pathname: pathname,
            query: {
              page: currentPage <= 3 ? 1 : currentPage - 2,
            },
          }}
          passHref
          shallow
          replace
          onClick={() =>
            setCurrentPageHandler(currentPage <= 3 ? 1 : currentPage - 2)
          }
        >
          {currentPage <= 3 ? "1" : currentPage - 2}
        </Link>
        <Link
          className="join-item btn"
          href={{
            pathname: pathname,
            query: {
              page: currentPage <= 3 ? 2 : currentPage - 1,
            },
          }}
          passHref
          shallow
          replace
          onClick={() =>
            setCurrentPageHandler(currentPage <= 3 ? 2 : currentPage - 1)
          }
        >
          {currentPage <= 3 ? "2" : currentPage - 1}
        </Link>
        <Link
          className="join-item btn"
          href={{
            pathname: pathname,
            query: {
              page: currentPage <= 3 ? 3 : currentPage,
            },
          }}
          passHref
          shallow
          replace
          onClick={() =>
            setCurrentPageHandler(currentPage <= 3 ? 3 : currentPage)
          }
        >
          {currentPage <= 3 ? "3" : currentPage}
        </Link>
        <Link
          className="join-item btn"
          href={{
            pathname: pathname,
            query: {
              page: currentPage <= 3 ? 4 : currentPage + 1,
            },
          }}
          passHref
          shallow
          replace
          onClick={() =>
            setCurrentPageHandler(currentPage <= 3 ? 4 : currentPage + 1)
          }
        >
          {currentPage <= 3 ? "4" : currentPage + 1}
        </Link>
        <Link
          className="join-item btn"
          href={{
            pathname: pathname,
            query: {
              page: currentPage <= 3 ? 5 : currentPage + 2,
            },
          }}
          passHref
          shallow
          replace
          onClick={() =>
            setCurrentPageHandler(currentPage <= 3 ? 5 : currentPage + 2)
          }
        >
          {currentPage <= 3 ? "5" : currentPage + 2}
        </Link>
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
              <form action={createNewDocument}>
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
                        New Document
                      </DialogTitle>
                      <div className="mt-4 flex w-full flex-col gap-4">
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Title
                            </Label>
                            <Input
                              name="title"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Date
                            </Label>
                            <Input
                              name="date"
                              type="date"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <DocumentRadioDropdown left={true} />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Description
                            </Label>
                            <Textarea
                              name="description"
                              className={clsx(
                                "mt-3 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              rows={8}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Author/s
                            </Label>
                            <Input
                              name="author"
                              type="text"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Post Link
                            </Label>
                            <Input
                              name="post_link"
                              type="text"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Image
                            </Label>
                            <Input
                              name="image"
                              type="text"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-col gap-4 text-black">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              External Links
                            </Label>
                            <AddDynamicInputFields />
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    onClick={() => setCreateForm(false)}
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
              <form action={editDocumentPOST}>
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
                        Edit Document
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
                              Title
                            </Label>
                            <Input
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={
                                editDocument && editDocument[0].title
                              }
                              name="title"
                            ></Input>
                          </Field>
                        </div>
                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Date
                            </Label>
                            <Input
                              type="date"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={
                                editDocument && editDocument[0].date
                              }
                              name="date"
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <DocumentRadioDropdown
                              left={true}
                              value={
                                editDocument && editDocument[0].document_type
                              }
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field>
                            <Label className="text-sm/6 font-medium text-black">
                              Description
                            </Label>
                            <Textarea
                              className={clsx(
                                "mt-3 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              rows={8}
                              defaultValue={
                                editDocument && editDocument[0].description
                              }
                              name="description"
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Author/s
                            </Label>
                            <Input
                              type="text"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={
                                editDocument && editDocument[0].author
                              }
                              name="author"
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Post Link
                            </Label>
                            <Input
                              type="url"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={
                                editDocument && editDocument[0].link
                              }
                              name="post_link"
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Image
                            </Label>
                            <Input
                              type="url"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              defaultValue={
                                editDocument && editDocument[0].image
                              }
                              name="image"
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md">
                          <Field className="flex flex-col gap-4 text-black">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              External Links
                            </Label>
                            <AddDynamicInputFields
                              data={
                                editDocument && editDocument[0].external_links
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
                    onClick={() => handleEditDocument("")}
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
    </div>
  );
}
