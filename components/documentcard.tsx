import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export interface DocumentCardData {
  Image?: string;
  Title: string;
  Date: string;
  URL: string;
  Description?: string;
  Author?: string;
  AcademicYear?: string;
  Location?: string;
}

export function DocumentCard({
  Image,
  Title,
  Date,
  URL,
  Description,
  Author,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4">
      {Image && (
        <img
          src={Image}
          alt=""
          className="aspect-square rounded-lg border-4 border-black object-cover"
        />
      )}
      <h1 className="text-2xl font-bold">{Title}</h1>
      <hr className="rounded-2xl border-2 font-bold text-blue-300" />
      <div className="flex min-h-12 flex-row items-center">
        <p className="grow basis-0 font-medium">{Date}</p>
        <Link
          href={URL}
          className="flex flex-row items-center gap-1 rounded-md bg-blue-200 px-4 py-2 text-black/70 hover:bg-black/80 hover:text-white"
          target="_blank"
        >
          Read More <IoIosArrowForward />{" "}
        </Link>
      </div>
      <p className="font-medium">{Description}</p>
      {Author && (
        <div className="mt-auto text-sm">
          <span className="font-bold">Author/s:</span>{" "}
          <span className="font-medium">{Author}</span>
        </div>
      )}
    </div>
  );
}

export default function EventCard({
  Image,
  Title,
  Date,
  AcademicYear,
  URL,
  Location,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4">
      {Image && (
        <img
          src={Image}
          alt=""
          className="aspect-square rounded-lg border-4 border-black object-cover"
        />
      )}
      <h1 className="text-2xl font-bold">{Title}</h1>
      <hr className="rounded-2xl border-2 font-bold text-blue-300" />
      <div className="flex min-h-12 flex-col">
        <p className="font-bolder grow basis-0 text-lg">{Location}</p>
        <p className="grow basis-0 text-md font-medium">{Date}</p>
        <p className="grow basis-0 text-sm font-thin">{AcademicYear}</p>
      </div>
      <Link
        href={URL}
        className="flex flex-row items-center justify-center gap-1 rounded-md bg-blue-200 px-4 py-2 text-black/70 hover:bg-black/80 hover:text-white"
      >
        Read More <IoIosArrowForward />{" "}
      </Link>
    </div>
  );
}
