import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Delete, Trash } from "lucide-react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

type InputField = { name: string };

import { useEffect } from "react";

export default function DynamicInputFieldsProjectHead({data} : {data?: any}) {
  const [inputs, setInputs] = useState<InputField[]>([]);

  useEffect(() => {
    if (data) {
      try {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (Array.isArray(parsed)) {
          setInputs(parsed);
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [data]);
    
  const handleAddInput = () => {
    setInputs([...inputs, { name: ""}]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name as keyof InputField] = value;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index: number) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  return (
    <div className="container flex flex-col gap-2">
      {inputs.length === 0 ? (
        <button
          onClick={() => handleAddInput()}
          className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-bold text-white text-nowrap"
        >
          Add Project Head
        </button>
      ) : (
        <div className="flex flex-row justify-around gap-1 text-sm font-semibold text-black">
          <span>Name</span>
          {inputs.length === 1 ? <span></span> : null}
        </div>
      )}
      {inputs.map((item, index) => (
        <div className="input_container flex flex-row gap-1" key={index}>
          <Input
            name="name"
            type="text"
            value={item.name}
            className={clsx(
              "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
            )}
            onChange={(event) => handleChange(event, index)}
          />
          {index === inputs.length - 1 && (
            <button
              onClick={() => handleDeleteInput(index)}
              className="rounded bg-red-500 px-1 text-black/70"
            >
              <Trash />
            </button>
          )}
          {index === inputs.length - 1 && (
            <button
              onClick={() => handleAddInput()}
              className="rounded bg-green-500 px-2 text-white"
            >
              <IoAdd />
            </button>
          )}
        </div>
      ))}
      <input name="project_heads" type="text" value={JSON.stringify(inputs)} className="invisible sr-only" readOnly />
    </div>
  );
}
