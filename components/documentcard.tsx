import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface DocumentCard {
  Title: string;
  Date: string;
  URL: string;
  Description: string;
  Author?: string;
}

function DocumentCard({ Title, Date, URL, Description, Author }: DocumentCard) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{Title}</h1>
      <hr />
      <div className="flex min-h-12 flex-row items-center">
        <p className="grow basis-0 font-medium">{Date}</p>
        <Link
          href={URL}
          className="rounded-md flex flex-row items-center gap-1 bg-black/70 px-4 py-2 text-white/90"
          target="_blank"
        >
          Read More <IoIosArrowForward />{" "}
        </Link>
      </div>
      <p className="font-medium">
        {Description}
      </p>
      {Author? (<div className="text-sm mt-auto"><span className="font-bold">Author/s:</span> <span className="font-medium">{Author}</span></div>): null}
    </div>
  );
}

export default DocumentCard;
