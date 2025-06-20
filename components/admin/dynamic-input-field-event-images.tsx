import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Delete, Trash } from "lucide-react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

type InputField = string[];

import { useEffect } from "react";
import { imgurUpload } from "@/utils/imgur-upload";
import Image from "next/image";
import { CreatePopup } from "./alert-fragment";

export default function DynamicInputFieldsEventImages({
  data,
}: {
  data?: any;
}) {
  const [inputs, setInputs] = useState<InputField>([]);
  const [base64Image, setBase64Image] = useState<string>("");
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    if (data) {
      try {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (Array.isArray(parsed)) {
          setInputs(parsed);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [data]);

  useEffect(() => {
    if (base64Image != "") {
      let onChangeValue = [...inputs];
      CreatePopup("Image uploading, please wait");
      imgurUpload(base64Image)
        .then((result) => {
          if (result.success && typeof index === "number") {
            onChangeValue[index] = result.data.link;
            setInputs(onChangeValue);
            CreatePopup("Image upload successful.", "success");
          } else {
            CreatePopup("Image did not upload. Please try again", "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [base64Image]);

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIndex(index);
    const reader = new FileReader();
    reader.onload = () => setBase64Image(reader.result as string);
    reader.readAsDataURL(file);
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
          Add Image
        </button>
      ) : (
        <div className="flex flex-row justify-around gap-1 text-sm font-semibold text-black">
          {inputs.length === 1 ? <span></span> : null}
        </div>
      )}
      {inputs.map((item, index) => (
        <div className="input_container flex flex-row gap-1" key={index}>
          <Image
            src={item != "" ? item : "/images/NoImage.png"}
            alt=""
            width={40}
            height={40}
            className={clsx(
              "block w-fit rounded-lg border-none bg-black/5 text-sm/6 text-black",
            )}
          />
          <Input
            name="image"
            type="file"
            className={clsx(
              "block w-full rounded-lg border-none bg-black/5 px-3 py-1.5 text-sm/6 text-black",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25",
            )}
            onChange={(event) => handleImageChange(event, index)}
            accept=".png,.jpg,.jpeg"
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
        name="images_data"
        type="text"
        value={JSON.stringify(inputs)}
        className="invisible sr-only"
        readOnly
      />
    </div>
  );
}
