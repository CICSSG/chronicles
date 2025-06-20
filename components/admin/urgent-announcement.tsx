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
import clsx from "clsx";
import { useEffect, useState } from "react";
import { UrgentAnnouncementDocumentData } from "../urgent-announcement";
import { UrgentAnnouncementDataSingle } from "./documents-data";
import { CreatePopup } from "./alert-fragment";
import {
  createQuickAnnouncementPOST,
  editQuickAnnouncementPOST,
  endQuickAnnouncementPOST,
} from "@/app/actions";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import { checkRole } from "@/utils/roles";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function QuickUrgentAnnouncementAdmin() {
  const { user } = useUser();
  const [documents, setDocuments] = useState<
    UrgentAnnouncementDocumentData[] | null
  >(null);
  const [hasActiveAnnouncement, setHasActiveAnnouncement] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [editTimer, setEditTimer] = useState(false);
  const [createButton, setCreateButton] = useState(false);
  const [createTimer, setCreateTimer] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [endForm, setEndForm] = useState(false);
  const [editFormData, setEditFormData] = useState<
    UrgentAnnouncementDocumentData | undefined
  >();
  const [createFormData, setCreateFormData] = useState<
    UrgentAnnouncementDocumentData | undefined
  >();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    UrgentAnnouncementDataSingle().then(({ documents }) => {
      setDocuments(documents ?? null);
    });

    const taskListener = supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "urgent_announcement" },
        (payload) => {
          UrgentAnnouncementDataSingle().then(({ documents }) => {
            setDocuments(documents ?? null);
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

  useEffect(() => {
    if (documents && documents[0].visibility) {
      const activeDocument = documents[0];

      setHasActiveAnnouncement(true);
      setEditTimer(activeDocument.time_visibility);
      setEditButton(activeDocument.button_visibility);
    } else {
      setHasActiveAnnouncement(false);
      setEditTimer(false);
      setEditButton(false);
    }
  }, [documents]);

  const handleCreateDialog = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    var temp: UrgentAnnouncementDocumentData = {
      id: 0,
      announcement: "",
      visibility: true,
      time_visibility: false,
      button_visibility: false,
      button_text: "",
      button_link: "",
      date: "",
    };

    console.log(formData.get("button_visible"));
    temp.id = (formData.get("id") ?? 0) as number;
    temp.announcement = (formData.get("announcement") ?? "") as string;
    temp.time_visibility = createTimer;
    temp.button_visibility = createButton;
    temp.button_text = (formData.get("button_text") ?? "") as string;
    temp.button_link = (formData.get("button_link") ?? "") as string;
    temp.date = (formData.get("date") ?? "") as string;

    setCreateFormData(temp);
    setCreateForm(true);
  };

  const handleDialog = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    var temp: UrgentAnnouncementDocumentData = {
      id: 0,
      announcement: "",
      visibility: true,
      time_visibility: false,
      button_visibility: false,
      button_text: "",
      button_link: "",
      date: "",
    };

    console.log(formData.get("button_visible"));
    temp.id = (formData.get("id") ?? 0) as number;
    temp.announcement = (formData.get("announcement") ?? "") as string;
    temp.time_visibility = editTimer;
    temp.button_visibility = editButton;
    temp.button_text = (formData.get("button_text") ?? "") as string;
    temp.button_link = (formData.get("button_link") ?? "") as string;
    temp.date = (formData.get("date") ?? "") as string;

    setEditFormData(temp);
    isEdit ? setEditForm(true) : setEndForm(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    formData.set(
      "active_announcement",
      hasActiveAnnouncement ? "true" : "false",
    );

    const result = await createQuickAnnouncementPOST(formData);
    if (result.success) {
      CreatePopup("Successfully created urgent announcement", "success");
      setCreateForm(false);
    } else {
      CreatePopup("Failed to create urgent announcement", "error");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const result = await editQuickAnnouncementPOST(formData);
    if (result.success) {
      CreatePopup("Successfully edited urgent announcement", "success");
      setEditForm(false);
    } else {
      CreatePopup("Failed to edit urgent announcement. Try again", "error");
    }
  };

  const handleEndSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const result = await endQuickAnnouncementPOST(formData);
    if (result.success) {
      CreatePopup("Successfully ended urgent annoucement", "success");
      setEndForm(false);
    } else {
      CreatePopup("Failed to end urgent announcement", "error");
    }
  };

  if (user?.publicMetadata.role === "admin") {
    return (
      <div className="flex h-fit w-full flex-col gap-4 rounded-2xl bg-white/80 p-6">
        <h1 className="text-2xl font-semibold underline ring-offset-2">
          Urgent Announcement
        </h1>
        <div className="flex flex-col gap-8">
          {/* Edit Active Announcement */}
          <div>
            {!hasActiveAnnouncement && (
              <h1 className="text-xl font-semibold">No active announcement.</h1>
            )}
            {hasActiveAnnouncement && (
              <>
                <h1 className="mb-4 text-xl font-semibold">
                  Active Announcement:
                </h1>
                <form
                  className="flex w-full flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDialog(e);
                  }}
                >
                  <Field className="hidden">
                    <Label className="text-sm/6 font-medium text-black">
                      ID
                    </Label>
                    <Input
                      name="id"
                      className={clsx(
                        "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                        "scheme-light",
                      )}
                      required
                      defaultValue={(documents && documents[0].id) ?? ""}
                    />
                  </Field>
                  <div className="flex flex-row gap-4">
                    <Field className="flex grow flex-row items-center gap-4">
                      <Label className="text-sm/6 font-medium text-black">
                        Value
                      </Label>
                      <Input
                        name="announcement"
                        className={clsx(
                          "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                        )}
                        required
                        maxLength={100}
                        defaultValue={
                          (documents && documents[0].announcement) ?? ""
                        }
                      />
                    </Field>
                    {editTimer && (
                      <Field className="flex flex-row items-center gap-4">
                        <Label className="text-sm/6 font-medium text-black">
                          Date
                        </Label>
                        <Input
                          name="date"
                          type="datetime-local"
                          className={clsx(
                            "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            "scheme-light",
                          )}
                          defaultValue={(documents && documents[0].date) ?? ""}
                        />
                      </Field>
                    )}
                  </div>
                  {editButton && (
                    <div className="flex w-full flex-row gap-4">
                      <Field className="flex grow basis-0 flex-row items-center gap-4">
                        <Label className="text-sm/6 font-medium text-nowrap text-black">
                          Text
                        </Label>
                        <Input
                          name="button_text"
                          type="text"
                          className={clsx(
                            "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            "scheme-light",
                          )}
                          defaultValue={
                            (documents && documents[0].button_text) ?? ""
                          }
                        />
                      </Field>
                      <Field className="flex grow basis-0 flex-row items-center gap-4">
                        <Label className="text-sm/6 font-medium text-nowrap text-black">
                          Link
                        </Label>
                        <Input
                          name="button_link"
                          type="text"
                          className={clsx(
                            "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                            "scheme-light",
                          )}
                          defaultValue={
                            (documents && documents[0].button_link) ?? ""
                          }
                        />
                      </Field>
                    </div>
                  )}

                  <div className="flex flex-row flex-wrap gap-4">
                    <Field className="flex flex-row items-center gap-4">
                      <Label className="text-sm/6 font-medium text-nowrap text-black">
                        Visible Timer
                      </Label>
                      <Input
                        name="timer_visible"
                        type="checkbox"
                        className={clsx(
                          "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                          "scheme-light",
                        )}
                        onChange={(e) => setEditTimer(e.target.checked)}
                        checked={editTimer}
                      />
                    </Field>
                    <Field className="flex flex-row items-center gap-4">
                      <Label className="text-sm/6 font-medium text-nowrap text-black">
                        Enable Button
                      </Label>
                      <Input
                        name="button_visible"
                        type="checkbox"
                        className={clsx(
                          "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                          "scheme-light",
                        )}
                        onChange={(e) => setEditButton(e.target.checked)}
                        checked={editButton}
                      />
                    </Field>
                    <div className="ml-auto flex flex-row gap-4">
                      <Button
                        type="submit"
                        onClick={(e) => setIsEdit(true)}
                        className="rounded-2xl bg-amber-400 px-5 py-2 font-bold text-black/80 hover:cursor-pointer hover:bg-amber-300"
                      >
                        Edit
                      </Button>
                      <Button
                        type="submit"
                        className="rounded-2xl bg-red-500 px-5 py-2 font-bold text-white/80 hover:cursor-pointer hover:bg-red-400"
                        onClick={(e) => setIsEdit(false)}
                      >
                        End
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
          <hr className="border-[1.5px]" />

          {/* Create Announcement */}
          <div>
            <h1 className="mb-4 text-xl font-semibold">Create Announcement:</h1>
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateDialog(e);
              }}
            >
              <div className="flex flex-row gap-4">
                <Field className="flex grow flex-row items-center gap-4">
                  <Label className="text-sm/6 font-medium text-black">
                    Value
                  </Label>
                  <Input
                    name="announcement"
                    className={clsx(
                      "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                    )}
                    required
                    maxLength={100}
                  />
                </Field>
                {createTimer && (
                  <Field className="flex flex-row items-center gap-4">
                    <Label className="text-sm/6 font-medium text-black">
                      Date
                    </Label>
                    <Input
                      name="date"
                      type="datetime-local"
                      className={clsx(
                        "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                        "scheme-light",
                      )}
                    />
                  </Field>
                )}
              </div>

              {createButton && (
                <div className="flex w-full flex-row gap-4">
                  <Field className="flex grow basis-0 flex-row items-center gap-4">
                    <Label className="text-sm/6 font-medium text-nowrap text-black">
                      Text
                    </Label>
                    <Input
                      name="button_text"
                      type="text"
                      className={clsx(
                        "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                        "scheme-light",
                      )}
                    />
                  </Field>
                  <Field className="flex grow basis-0 flex-row items-center gap-4">
                    <Label className="text-sm/6 font-medium text-nowrap text-black">
                      Link
                    </Label>
                    <Input
                      name="button_link"
                      type="text"
                      className={clsx(
                        "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                        "scheme-light",
                      )}
                    />
                  </Field>
                </div>
              )}
              <div className="flex flex-row flex-wrap gap-4">
                <Field className="flex flex-row items-center gap-4">
                  <Label className="text-sm/6 font-medium text-nowrap text-black">
                    Visible Timer
                  </Label>
                  <Input
                    name="timerVisible"
                    type="checkbox"
                    className={clsx(
                      "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                      "scheme-light",
                    )}
                    onChange={(e) => setCreateTimer(e.target.checked)}
                  />
                </Field>
                <Field className="flex flex-row items-center gap-4">
                  <Label className="text-sm/6 font-medium text-nowrap text-black">
                    Enable Button
                  </Label>
                  <Input
                    name="buttonVisible"
                    type="checkbox"
                    className={clsx(
                      "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                      "scheme-light",
                    )}
                    onChange={(e) => setCreateButton(e.target.checked)}
                  />
                </Field>
                <Button
                  className="ml-auto rounded-2xl bg-green-400 px-5 py-2 font-bold text-black/80 hover:cursor-pointer hover:bg-green-300"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Create Dialog */}
        <div>
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
                        <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold text-gray-900"
                          >
                            Create Announcement
                          </DialogTitle>

                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {!hasActiveAnnouncement
                                ? "Are you sure you want to create the announcement?"
                                : "There is an active announcement right now. If you confirm, this will disable the current active announcement."}
                            </p>
                          </div>

                          <div className="">
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Input
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    createFormData && createFormData.id
                                  }
                                  name="id"
                                ></Input>
                              </Field>
                            </div>
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-black">
                                  Announcement
                                </Label>
                                <Input
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    createFormData &&
                                    createFormData.announcement
                                  }
                                  name="announcement"
                                ></Input>
                              </Field>
                            </div>
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-black">
                                  Date
                                </Label>
                                <Input
                                  type="text"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                    "scheme-light",
                                  )}
                                  defaultValue={
                                    createFormData && createFormData.date
                                  }
                                  name="date"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field>
                                <Label className="text-sm/6 font-medium text-black">
                                  Text
                                </Label>
                                <Input
                                  className={clsx(
                                    "mt-3 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    createFormData && createFormData.button_text
                                  }
                                  name="button_text"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Link
                                </Label>
                                <Input
                                  type="text"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    createFormData && createFormData.button_link
                                  }
                                  name="button_link"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Timer Visibility
                                </Label>
                                <Input
                                  type="checkbox"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultChecked={
                                    createFormData &&
                                    createFormData.time_visibility
                                  }
                                  name="timer_visible"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Button Visibility
                                </Label>
                                <Input
                                  type="checkbox"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultChecked={
                                    createFormData &&
                                    createFormData.button_visibility
                                  }
                                  name="button_visible"
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
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:cursor-pointer hover:bg-green-500 sm:ml-3 sm:w-auto"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => {
                          setCreateForm(false);
                        }}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:cursor-pointer hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

        {/* Edit Dialog */}
        <div>
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
                            Edit Announcement
                          </DialogTitle>

                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to edit the announcement?
                            </p>
                          </div>

                          <div className="hidden">
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Input
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={editFormData && editFormData.id}
                                  name="id"
                                ></Input>
                              </Field>
                            </div>
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-black">
                                  Announcement
                                </Label>
                                <Input
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    editFormData && editFormData.announcement
                                  }
                                  name="announcement"
                                ></Input>
                              </Field>
                            </div>
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-black">
                                  Date
                                </Label>
                                <Input
                                  type="text"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                    "scheme-light",
                                  )}
                                  defaultValue={
                                    editFormData && editFormData.date
                                  }
                                  name="date"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field>
                                <Label className="text-sm/6 font-medium text-black">
                                  Text
                                </Label>
                                <Input
                                  className={clsx(
                                    "mt-3 block w-full resize-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    editFormData && editFormData.button_text
                                  }
                                  name="button_text"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Link
                                </Label>
                                <Input
                                  type="text"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={
                                    editFormData && editFormData.button_link
                                  }
                                  name="button_link"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Timer Visibility
                                </Label>
                                <Input
                                  type="checkbox"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultChecked={
                                    editFormData && editFormData.time_visibility
                                  }
                                  name="timer_visible"
                                />
                              </Field>
                            </div>

                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Label className="text-sm/6 font-medium text-nowrap text-black">
                                  Button Visibility
                                </Label>
                                <Input
                                  type="checkbox"
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultChecked={
                                    editFormData &&
                                    editFormData.button_visibility
                                  }
                                  name="button_visible"
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
                        className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:cursor-pointer hover:bg-amber-500 sm:ml-3 sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => {
                          setEditForm(false);
                          setIsEdit(false);
                        }}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:cursor-pointer hover:bg-gray-50 sm:mt-0 sm:w-auto"
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

        {/* End Dialog */}
        <div>
          <Dialog open={endForm} onClose={() => setEndForm(false)}>
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
                      handleEndSubmit(e);
                    }}
                  >
                    <div className="max-h-[800px] overflow-y-auto bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                          <DocumentIcon
                            aria-hidden="true"
                            className="size-6 text-red-600"
                          />
                        </div>
                        <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold text-gray-900"
                          >
                            End Announcement
                          </DialogTitle>

                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to end the announcement?
                            </p>
                          </div>

                          <div className="hidden">
                            <div className="w-full max-w-md">
                              <Field className="flex flex-row items-center gap-4">
                                <Input
                                  className={clsx(
                                    "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
                                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                                  )}
                                  defaultValue={editFormData && editFormData.id}
                                  name="id"
                                ></Input>
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:cursor-pointer hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        End
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setEndForm(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:cursor-pointer hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
      </div>
    );
  }
}
