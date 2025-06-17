import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export interface DocumentCardData {
  ImageLink?: string;
  Title: string;
  Date: string;
  URL: string;
  Description?: string;
  Author?: string;
  AcademicYear?: string;
  Location?: string;
}

export interface SlateCardData {
  ImageLink?: string;
  URL: string;
  AcademicYear: string;
}

export function DocumentCard({
  ImageLink,
  Title,
  Date,
  URL,
  Description,
  Author,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl">
      {Image && (
        <Image
          src={ImageLink? ImageLink : "https://i.imgur.com/6pP0o7C.png"}
          width={400}
          height={400}
          alt=""
          className="aspect-square rounded-lg border-4 border-black object-cover mx-auto"
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

export function ExecutiveCard({
  ImageLink,
  Title,
  Date,
  URL,
  Description,
  Author,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl">
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

export function TransparencyCard({
  ImageLink,
  Title,
  Date,
  URL,
  Description,
  Author,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl">
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

export function AnnouncementCard({
  ImageLink,
  Title,
  Date,
  URL,
  Description,
  Author,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl">
      {Image && (
        <Image
          src={ImageLink? ImageLink : "https://i.imgur.com/6pP0o7C.png"}
          width={400}
          height={400}
          alt=""
          className="aspect-square rounded-lg border-4 border-black object-cover mx-auto"
        />
      )}
      <h1 className="text-2xl font-bold lg:min-h-[3.975rem]">{Title}</h1>
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
  ImageLink,
  Title,
  Date,
  AcademicYear,
  URL,
  Location,
}: DocumentCardData) {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl">
      {ImageLink && (
        <Image
          src={ImageLink? ImageLink : "https://i.imgur.com/6pP0o7C.png"}
          width={400}
          height={400}
          alt=""
          className="aspect-square rounded-lg border-4 border-black object-cover mx-auto"
        />
      )}
      <h1 className="text-2xl font-bold lg:min-h-[3.9725rem] ">{Title}</h1>
      <hr className="rounded-2xl border-2 font-bold text-blue-300" />
      <div className="h-full flex min-h-12 flex-col">
        <p className="font-bolder grow basis-0 text-lg">{Location}</p>
        <p className="grow basis-0 text-md font-medium">{Date}</p>
        <p className="grow basis-0 text-sm font-medium">{AcademicYear}</p>
      </div>
      <Link
        href={URL}
        className="flex flex-row items-center justify-center gap-1 rounded-md bg-blue-200 px-4 py-2 text-black/70 hover:bg-black/80 hover:text-white mt-auto"
      >
        Read More <IoIosArrowForward />{" "}
      </Link>
    </div>
  );
}

export function SlateCard({
  ImageLink,
  AcademicYear,
  URL,
}: SlateCardData) {
  return (
    <div className="flex flex-col gap-4">
      {ImageLink && (
        <Image
          src={ImageLink? ImageLink : "https://i.imgur.com/6pP0o7C.png"}
          alt=""
          width={250}
          height={250}
          className="rounded-lg border-4 border-black object-cover grow-1 basis-0 aspect-square md:aspect-auto mx-auto"
        />
      )}
      <h1 className="text-2xl font-bold md:min-h-[3.9725rem] text-center">Academic Year <br /><p className="font-normal">{AcademicYear}</p></h1>
      <hr className="rounded-2xl border-2 font-bold text-blue-300" />
      {/* <div className="flex min-h-12 flex-col">
        <p className="grow basis-0 text-sm font-thin"></p>
      </div> */}
      <Link
        href={URL}
        className="flex flex-row items-center justify-center gap-1 rounded-md bg-blue-200 px-4 py-2 text-black/70 hover:bg-black/80 hover:text-white mt-auto"
      >
        View Slate <IoIosArrowForward />{" "}
      </Link>
    </div>
  );
}