import { Button, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

export default function QuickUrgentAnnouncementAdmin() {
  const [editButton, setEditButton] = useState(false);
  const [editTimer, setEditTimer] = useState(false);
  const [createButton, setCreateButton] = useState(false);
  const [createTimer, setCreateTimer] = useState(false);

  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-2xl bg-white/80 p-6 xl:w-1/2">
      <h1 className="text-2xl font-semibold underline ring-offset-2">
        Urgent Announcement
      </h1>
      <div className="flex flex-col gap-8">
        {/* Edit Active Announcement */}
        <div>
          <h1 className="mb-4 text-xl font-semibold">Active Announcement:</h1>
          <form className="flex w-full flex-col gap-4">
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
                  maxLength={150}
                />
              </Field>
              {editTimer && (
                <Field className="flex flex-row items-center gap-4">
                  <Label className="text-sm/6 font-medium text-black">
                    Date
                  </Label>
                  <Input
                    name="date"
                    type="date"
                    className={clsx(
                      "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                      "scheme-light",
                    )}
                    required
                  />
                </Field>
              )}
            </div>
            {editButton && (
              <div className="flex flex-row gap-4 w-full">
                <Field className="grow basis-0 flex flex-row items-center gap-4">
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
                <Field className="grow basis-0 flex flex-row items-center gap-4">
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

            <div className="flex flex-row gap-4">
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
                  onChange={(e) => setEditTimer(e.target.checked)}
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
                  onChange={(e) => setEditButton(e.target.checked)}
                />
              </Field>
              <div className="ml-auto flex flex-row gap-4">
                <Button className="rounded-2xl bg-amber-400 px-5 py-2 font-bold text-black/80 hover:cursor-pointer hover:bg-amber-300">
                  Edit
                </Button>
                <Button className="rounded-2xl bg-red-500 px-5 py-2 font-bold text-white/80 hover:cursor-pointer hover:bg-red-400">
                  End
                </Button>
              </div>
            </div>
          </form>
        </div>
        <hr />

        {/* Create Announcement */}
        <div>
          <h1 className="mb-4 text-xl font-semibold">Create Announcement:</h1>
          <form className="flex w-full flex-col gap-4">
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
                  maxLength={150}
                />
              </Field>
              {createTimer && (
                <Field className="flex flex-row items-center gap-4">
                  <Label className="text-sm/6 font-medium text-black">
                    Date
                  </Label>
                  <Input
                    name="date"
                    type="date"
                    className={clsx(
                      "block w-full rounded-lg border-none bg-black/20 px-3 py-1.5 text-sm/6 text-black",
                      "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
                      "scheme-light",
                    )}
                    required
                  />
                </Field>
              )}
            </div>

            {createButton && (
              <div className="flex flex-row gap-4 w-full">
                <Field className="grow basis-0 flex flex-row items-center gap-4">
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
                <Field className="grow basis-0 flex flex-row items-center gap-4">
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
            <div className="flex flex-row gap-4">
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
              <Button className="ml-auto rounded-2xl bg-green-400 px-5 py-2 font-bold text-black/80 hover:cursor-pointer hover:bg-green-300">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
