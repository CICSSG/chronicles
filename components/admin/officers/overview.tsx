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
import { ArrowLeftCircleIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "clsx";
import {
  editAdviserPOST,
  editGovernorPOST,
  editImagePOST,
  editViceGovernorPOST,
} from "@/app/actions";
import { imgurUpload } from "@/utils/imgur-upload";
import { CreatePopup } from "../alert-fragment";
import DynamicInputFieldsResponsibilities from "../dynamic-input-field-responsibilities";
import DynamicInputFieldsContactInfo from "../dynamic-input-field-contact-info";

export default function OfficersOverview({ document }: { document: any }) {
  const [editImageForm, setImageForm] = useState(false);
  const [editAdviserForm, setAdviserForm] = useState(false);
  const [editGovernorForm, setGovernorForm] = useState(false);
  const [editViceGovernorForm, setViceGovernorForm] = useState(false);

  const [base64Image, setBase64Image] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (base64Image) {
      CreatePopup("Image uploading");
      imgurUpload(base64Image)
        .then((result) => {
          setImage(`${result.data.link}`);
          CreatePopup("Image upload successful!", "success");
        })
        .catch((err) => {
          CreatePopup("Image failed to upload. Try Again", "error");
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

  const handleEditImage = () => {
    setImageForm(true);
    setImage(document?.image || "");
  };

  const handleEditImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (image == "" && base64Image != "") {
      CreatePopup("Image was not uploaded yet. Please wait", "error");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await editImagePOST(formData);
      setImageForm(false);
      setBase64Image("");
      setImage("");
      if (result.success) {
        CreatePopup("Successfully edited slate image", "success");
      } else {
        CreatePopup("Failed to edit slate image. Try again", "error");
      }
    }
  };

  const handleEditAdviser = () => {
    setAdviserForm(true);
    setImage(document?.adviser?.image || "");
  };

  const handleEditAdviserSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    if (image == "" && base64Image != "") {
      CreatePopup("Image was not uploaded yet. Please wait", "error");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await editAdviserPOST(formData);
      setAdviserForm(false);
      setBase64Image("");
      setImage("");
      if (result.success) {
        CreatePopup("Successfully edited adviser", "success");
      } else {
        CreatePopup("Failed to edit adviser. Try again", "error");
      }
    }
  };

  const handleEditGovernor = () => {
    setGovernorForm(true);
    setImage(document?.governor?.image || "");
  };

  const handleEditGovernorSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    if (image == "" && base64Image != "") {
      CreatePopup("Image was not uploaded yet. Please wait", "error");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await editGovernorPOST(formData);
      setGovernorForm(false);
      setBase64Image("");
      setImage("");
      if (result.success) {
        CreatePopup("Successfully edited governor", "success");
      } else {
        CreatePopup("Failed to edit governor. Try again", "error");
      }
    }
  };

  const handleEditViceGovernor = () => {
    setViceGovernorForm(true);
    setImage(document?.vice_governor?.image || "");
  };

  const handleEditViceGovernorSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    if (image == "" && base64Image != "") {
      CreatePopup("Image was not uploaded yet. Please wait", "error");
    } else {
      const formData = new FormData(e.currentTarget);
      formData.set("image", image ?? "");
      const result = await editViceGovernorPOST(formData);
      setViceGovernorForm(false);
      setBase64Image("");
      setImage("");
      if (result.success) {
        CreatePopup("Successfully edited vice governor", "success");
      } else {
        CreatePopup("Failed to edit vice governor. Try again", "error");
      }
    }
  };

  const executiveRedirectString =
    "/admin/officers/" + document?.id + "/executive";
  const legislativeRedirectString =
    "/admin/officers/" + document?.id + "/legislative";
  const juniorOfficersRedirectString =
    "/admin/officers/" + document?.id + "/junior-officers";
  const committeesRedirectString =
    "/admin/officers/" + document?.id + "/committees";

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-5 text-white/95">
      <Link
        href={"/admin/officers"}
        className="flex flex-row items-center gap-2 text-xl"
      >
        <ArrowLeftCircleIcon className="size-6" /> Back to Slate
      </Link>
      <div className="flex grow-0 basis-0 flex-row items-center justify-between">
        <div className="">
          <h1 className="text-4xl font-bold">Slate Overview</h1>
          <p className="text-lg font-semibold">
            Currently editing academic year {document && document.academic_year}
          </p>
        </div>
      </div>

      <div className="relative flex min-h-fit basis-0 flex-col justify-between overflow-x-auto overflow-y-auto rounded-2xl border bg-white/10 p-4 shadow-xl">
        <table className="table">
          <thead className="text-white">
            <tr className="border-b border-b-black">
              <th>Data</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="*:border-b *:border-b-black/30 *:hover:bg-white/10">
            <tr className="w-full">
              <th className="text-nowrap">Image</th>
              <td className="text-nowrap">
                <img
                  src={
                    document && document.image
                      ? document.image
                      : "https://i.imgur.com/6pP0o7C.png"
                  }
                  alt="Slate Image"
                  className="h-16"
                />
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Button
                  onClick={() => handleEditImage()}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Button>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Adviser</th>
              <td className="text-nowrap">
                {document && document.adviser.name}
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Button
                  onClick={() => handleEditAdviser()}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Button>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Governor</th>
              <td className="text-nowrap">
                {document && document.governor.name}
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Button
                  onClick={() => handleEditGovernor()}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Button>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Vice Governor</th>
              <td className="text-nowrap">
                {document && document.vice_governor.name}
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Button
                  onClick={() => handleEditViceGovernor()}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Button>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Executive Board</th>
              <td className="text-nowrap">
                {(document && document.directorate?.length) || "0"} items
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Link
                  href={executiveRedirectString}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Link>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Legislative Council</th>
              <td className="text-nowrap">
                {(document && document.legislative?.length) || "0"} items
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Link
                  href={legislativeRedirectString}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Link>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Junior Officers</th>
              <td className="text-nowrap">
                {(document && document.junior_officers?.length) || "0"} items
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Link
                  href={juniorOfficersRedirectString}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Link>
              </td>
            </tr>

            <tr className="w-full">
              <th className="text-nowrap">Committees</th>
              <td className="text-nowrap">
                {(document && Object.keys(document.committees || {}).length) ||
                  "0"}{" "}
                items
              </td>
              <td className="flex flex-row gap-2 text-center font-semibold *:rounded-xl *:px-4 *:py-2">
                <Link
                  href={committeesRedirectString}
                  className="basis-0 bg-amber-200 text-nowrap text-black hover:cursor-pointer hover:bg-amber-100"
                >
                  Edit
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit Image */}
      <Dialog open={editImageForm} onClose={() => setImageForm(false)}>
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
                  handleEditImageSubmit(e);
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
                        Edit Image
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
                    onClick={() => setImageForm(false)}
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

      {/* Edit Adviser */}
      <Dialog open={editAdviserForm} onClose={() => setAdviserForm(false)}>
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
                  handleEditAdviserSubmit(e);
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
                        Edit Adviser
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
                              defaultValue={document && document.adviser.name}
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
                    onClick={() => setAdviserForm(false)}
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

      {/* Edit Governor */}
      <Dialog open={editGovernorForm} onClose={() => setGovernorForm(false)}>
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
                  handleEditGovernorSubmit(e);
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
                        Edit Governor
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
                              defaultValue={document && document.governor.name}
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

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <DynamicInputFieldsResponsibilities
                              data={
                                document && document.governor.responsibilities
                              }
                            />
                          </Field>
                        </div>

                        {/* <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <DynamicInputFieldsContactInfo
                              data={document && document.governor.contact_info}
                            />
                          </Field>
                        </div> */}
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
                    onClick={() => setGovernorForm(false)}
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

      {/* Edit Vice Governor */}
      <Dialog
        open={editViceGovernorForm}
        onClose={() => setViceGovernorForm(false)}
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
                  handleEditViceGovernorSubmit(e);
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
                        Edit Vice Governor
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
                              defaultValue={
                                document && document.vice_governor.name
                              }
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

                        <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <DynamicInputFieldsResponsibilities
                              data={
                                document && document.vice_governor.responsibilities
                              }
                            />
                          </Field>
                        </div>

                        {/* <div className="w-full max-w-md">
                          <Field className="flex flex-row items-center gap-4">
                            <DynamicInputFieldsContactInfo
                              data={document && document.vice_governor.contact_info}
                            />
                          </Field>
                        </div> */}
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
                    onClick={() => setViceGovernorForm(false)}
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
