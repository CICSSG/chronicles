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
import React, { useState } from "react";
import { ArrowLeftCircleIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import {
  createCommitteePOST,
  deleteCommitteePOST,
  editCommitteePOST,
} from "@/app/actions";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import DynamicInputFieldsCommitteeHead from "./dynamic-input-field-committee-head";
import DynamicInputFieldsCommittee from "./dynamic-input-field-committee";
import { CreatePopup } from "../alert-fragment";

export default function CommitteesOverview({ document }: { document: any }) {
  const [createOfficerForm, setCreateOfficerForm] = useState(false);
  const [editOfficerForm, setEditOfficerForm] = useState(false);
  const [editCommitteeName, setEditCommitteeName] = useState("");
  const [deleteForm, setDeleteForm] = useState(false);
  const [deleteDocumentId, setDeleteDocumentId] = useState("");
  const [deleteCommitteeName, setDeleteCommitteeName] = useState("");

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const result = await createCommitteePOST(formData);
    setCreateOfficerForm(false);
    if (result.success) {
      CreatePopup("Successfully created committee", "success");
    } else {
      CreatePopup("Failed to create committee", "error");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    formData.set("id_committee_name", editCommitteeName ?? null);
    const result = await editCommitteePOST(formData);
    setEditOfficerForm(false);
    if (result.success) {
      CreatePopup("Successfully edited committee", "success");
    } else {
      CreatePopup("Failed to edit committee. Try again", "error");
    }
  };

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const result = await deleteCommitteePOST(formData);
    setDeleteForm(false);
    if (result.success) {
      CreatePopup("Successfully deleted committee", "success");
    } else {
      CreatePopup("Failed to delete committee", "error");
    }
  };

  function handleEditDocument(name: string) {
    setEditOfficerForm(true);
    setEditCommitteeName(name);
  }

  const handleDeleteDocument = (id: string, name: string, open: boolean) => {
    setDeleteDocumentId(id);
    setDeleteCommitteeName(name);
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
          <h1 className="text-4xl font-bold">Committees</h1>
          <p className="text-lg font-semibold">
            Currently editing academic year {document && document.academic_year}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between align-bottom">
        <Button
          onClick={() => {
            setCreateOfficerForm(true);
          }}
          className="mx-2 mt-auto flex h-fit flex-row items-center justify-self-start rounded-lg bg-green-600 px-3 py-1.5 font-semibold text-white hover:bg-green-500"
        >
          New Committee
        </Button>
      </div>

      <div className="relative flex min-h-fit basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table">
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th>Committee</th>
              <th>Head/s</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            {document &&
              document.committees &&
              Object.entries(document.committees).map(
                ([committeeName, committeeData]: [string, any], i: number) => (
                  <tr key={i} className="w-full">
                    <td className="text-nowrap">{committeeName}</td>
                    <td className="text-nowrap">
                      {committeeData.head.map((data: string, i: number) => (
                        <span key={i} className="font-medium">
                          {data}
                          {i < committeeData.head.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td className="text-nowrap">
                      {committeeData.committees.length}
                    </td>
                    <td className="grid grid-flow-row grid-cols-2 gap-2 text-center font-semibold *:my-auto *:rounded-xl *:px-4 *:py-2">
                      <Button
                        onClick={() => handleEditDocument(committeeName)}
                        className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteDocument(document.id, committeeName, true)
                        }
                        className="basis-0 bg-red-400 text-nowrap text-black hover:cursor-pointer hover:bg-red-300"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
      </div>

      {/* New Committee */}
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
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-fit data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateSubmit(e)
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
                        Create new committee
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
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Committee Name
                            </Label>
                            <Input
                              name="committee_name"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                            />
                          </Field>
                        </div>
                      </div>
                      <div className="mt-4 flex w-full flex-row gap-4">
                        <div className="w-full max-w-md grow basis-0">
                          <Field className="flex flex-col items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Committee Head/s
                            </Label>
                            <DynamicInputFieldsCommitteeHead />
                          </Field>
                        </div>

                        <div className="w-full max-w-md grow basis-0">
                          <Field className="flex flex-col items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Committees
                            </Label>
                            <DynamicInputFieldsCommittee />
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

      {/* Edit Committee */}
      <Dialog open={editOfficerForm} onClose={() => setEditOfficerForm(false)}>
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
                    <div className="mt-3 w-full overflow-y-scroll text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Edit Committee
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
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Committee Name
                            </Label>
                            <Input
                              name="committee_name"
                              className={clsx(
                                "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                              )}
                              required
                              defaultValue={editCommitteeName}
                            />
                          </Field>
                        </div>
                      </div>
                      <div className="mt-4 flex w-full flex-row gap-4">
                        <div className="w-full max-w-md grow basis-0">
                          <Field className="flex flex-col items-center gap-4">
                            <Label className="text-sm/6 font-medium text-nowrap text-black">
                              Committee Head/s
                            </Label>
                            <DynamicInputFieldsCommitteeHead
                              data={
                                document &&
                                document.committees[editCommitteeName]?.head
                              }
                            />
                          </Field>
                        </div>

                        <div className="w-full max-w-md grow basis-0">
                          <Field className="flex flex-col items-center gap-4">
                            <Label className="text-sm/6 font-medium text-black">
                              Committees
                            </Label>
                            <DynamicInputFieldsCommittee
                              data={
                                document &&
                                document.committees[editCommitteeName]
                                  ?.committees
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
              <form onSubmit={(e) => {
                e.preventDefault();
                handleDeleteSubmit(e);
              }}>
                <input
                  type="text"
                  name="id"
                  className="hidden"
                  defaultValue={deleteDocumentId}
                />
                <input
                  type="text"
                  name="committee_name"
                  className="hidden"
                  defaultValue={deleteCommitteeName}
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
                        Delete committee
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete{" "}
                          <span className="font-bold">
                            {deleteCommitteeName} Committee
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
