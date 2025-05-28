import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface DocumentCard {
  Title: string;
  Date: string;
  URL: string;
  Description: string;
}

function DocumentCard({ Title, Date, URL, Description }: DocumentCard) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{Title}</h1>
      <hr />
      <div className="flex min-h-12 flex-row items-center">
        <p className="grow basis-0">{Date}</p>
        <Link
          href={URL}
          className="rounded-box flex flex-row items-center gap-1 bg-neutral-900 px-4 py-2 text-white"
        >
          Read More <IoIosArrowForward />{" "}
        </Link>
      </div>
      <p>
        {Description}
      </p>
    </div>
  );
}

export default DocumentCard;
