import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function DocumentRadioDropdown({ left }: { left?: boolean }) {
  left == null ? (left = false) : null;
  return (
    <div className={left == false ? "w-full max-w-1xs px-4" : "flex flex-row"}>
      <Field className={left == false ? "" : "flex flex-row items-center gap-4"}>
        <Label className="text-sm/6 font-medium text-black">
          Document Type
        </Label>
        {/* <Description className="text-sm/6 text-black/50">This will be visible to clients on the project.</Description> */}
        <div className="relative">
          <Select
            name="document_type"
            defaultValue={"none"}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black/45 focus:text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
              // Make the text of each option black on Windows
              "*:text-black",
            )}
          >
            <option value="none" disabled>
              Document Type
            </option>
            <option value="executive-order">Executive Order</option>
            <option value="transparency-report">Transparency Report</option>
            <option value="ordinance">Ordinance</option>
            <option value="formal-document">Formal Document</option>
            <option value="resolution">Resolution</option>
          </Select>
          {left == false ? (
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </Field>
    </div>
  );
}
