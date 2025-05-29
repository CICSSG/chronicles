import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const options = [
  {option: "Executive Order", value: "executive-order"},
  {option: "Transparency Report", value: "transparency-report"},
  {option: "Ordinance", value: "ordinance"},
  {option: "Formal Document", value: "formal-document"},
  {option: "Resolution", value: "resolution"},
]
export default function DocumentRadioDropdown({ left, value, white }: { left?: boolean, value? : string, white?: boolean }) {
  left == null ? (left = false) : null;
  value == null ? (value = "none") : null;
  white == null ? (white = false) : null;
  return !white ? (
    <div className={left == false ? "w-full max-w-1xs px-4" : "flex flex-row"}>
      <Field className={left == false ? "" : "flex flex-row items-center gap-4"}>
        <Label className="text-sm/6 font-medium text-black">
          Document Type
        </Label>
        <div className="relative">
          <Select
            name="document_type"
            defaultValue={value}
            className={clsx(
              "block w-full appearance-none rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black/45 focus:text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
              // Make the text of each option black on Windows
              "*:text-black",
            )}
          >
            <option value="none" disabled>
              Document Type
            </option>
            {options.map((data, i) => (
              <option key={i} value={data.value}>{data.option}</option>
            ))}
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
  ) : (
    <div className={left == false ? "w-full max-w-1xs px-4" : "flex flex-row"}>
      <Field className={left == false ? "" : "flex flex-row items-center gap-4"}>
        <Label className="text-sm/6 font-medium text-white">
          Document Type
        </Label>
        <div className="relative">
          <Select
            name="document_type"
            defaultValue={value}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white/45 focus:text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
              // Make the text of each option black on Windows
              "*:text-black",
            )}
          >
            <option value="none" disabled>
              Document Type
            </option>
            {options.map((data, i) => (
              <option key={i} value={data.value}>{data.option}</option>
            ))}
          </Select>
          {left == false ? (
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </Field>
    </div>
  )
}
