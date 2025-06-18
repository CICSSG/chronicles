import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Delete, Trash } from "lucide-react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

type InputField = { name: string; position: string; image: string };

import { useEffect } from "react";
import { imgurUpload } from "@/utils/imgur-upload";
import Image from "next/image";

export default function DynamicInputFieldsStaff({ data }: { data?: any }) {
  const [inputs, setInputs] = useState<InputField[]>([]);
  const [base64Image, setBase64Image] = useState<string>("");
  useEffect(() => {
    if (data) {
      try {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        console.log(data);
        if (Array.isArray(parsed)) {
          setInputs(parsed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [data]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: "", position: "", image: "" }]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name as keyof InputField] = value;
    setInputs(onChangeValue);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBase64Image(reader.result as string);
    reader.readAsDataURL(file);
    const { name, value } = event.target;
    let onChangeValue = [...inputs];

    imgurUpload(base64Image)
      .then((result) => {
        console.log(result);
        console.log(onChangeValue)
        console.log(onChangeValue[index])
        console.log(onChangeValue[index].name)
        console.log(onChangeValue[index]["position"])
        console.log(result.data.link)
        onChangeValue[index]["image"] = result.data.link;
      })
      .catch((err) => {
        console.log(err);
      });

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
          className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-bold text-nowrap text-white"
        >
          Add Highlight
        </button>
      ) : (
        <div className="flex flex-row justify-around gap-1 text-sm font-semibold text-black">
          <span>Name</span>
          <span>Position</span>
          <span>Image</span>
          {inputs.length === 1 ? <span></span> : null}
        </div>
      )}
      {inputs.map((item, index) => (
        <div className="input_container flex flex-row gap-1" key={index}>
          <Image
            src={item.image !== "" ? item.image : "/images/NoImage.png"}
            alt=""
            width={30}
            height={30}
            className="aspect-square"
          />
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
          <Input
            name="position"
            type="text"
            value={item.position}
            className={clsx(
              "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
            )}
            onChange={(event) => handleChange(event, index)}
          />
          <Input
            name="image"
            type="file"
            value={item.image}
            className={clsx(
              "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
            )}
            onChange={(event) => handleImageChange(event, index)}
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
      <input
        name="highlights"
        type="text"
        value={JSON.stringify(inputs)}
        className="invisible sr-only"
        readOnly
      />
    </div>
  );
}
