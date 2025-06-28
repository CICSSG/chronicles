"use client";
import {
  PublicAnnouncementForHomeData,
  PublicDocumentData,
  PublicEventsForHomeData,
} from "@/components/public-documents-data";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [announcements, setAnnouncements] = useState<any[] | null>(null);
  const [events, setEvents] = useState<any[] | null>(null);

  useEffect(() => {
    PublicAnnouncementForHomeData().then(({ documents }) => {
      setAnnouncements(documents ?? null);
    });

    PublicEventsForHomeData().then(({ documents }) => {
      setEvents(documents ?? null);
    });
  }, []);

  return (
    <>
      <div className="m-auto flex max-w-full grow flex-col gap-5 text-2xl xl:flex-row">
        {/* Left 2 Columns */}
        <div className="flex grow-6 basis-0 flex-col gap-5">
          <div className="flex grow flex-col justify-between overflow-hidden rounded-2xl bg-[url(/images/noiselowblack.png)] bg-white/90 bg-linear-to-br from-white via-white to-white/60 p-5 transition-all md:flex-row md:items-center md:p-1">
            <div className="bgImage hidden overflow-hidden rounded-2xl md:block">
              <Image
                src={"/images/HeroPanther.png"}
                alt="CICS Panther"
                width={450}
                height={450}
                className="aspect-square"
              />
            </div>
            <div className="text text-right text-2xl md:text-2xl lg:text-4xl">
              <h1 className="md:mr-12">
                For Students, By <br className="sm:hidden" />
                Students <br /> - A Legacy Of{" "}
                <span className="text-neutral-600">Service</span> And <br />
                <span className="text-neutral-600">Support.</span>
              </h1>
            </div>
          </div>
          {/* Middle Two */}
          <div className="flex grow flex-col gap-5 md:flex-row">
            {/* The CICS */}
            <Link
              href={"/cics"}
              className="relative flex min-h-64 grow basis-0 items-center overflow-hidden rounded-2xl bg-white bg-linear-to-br from-white via-white to-black/25 transition-all hover:scale-102"
            >
              <h2 className="absolute top-6 left-6 z-2">The CICS</h2>
              <Image
                src={"/images/TheCICS.png"}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </Link>
            {/* The CICSSG */}
            <Link
              href={"/cicssg"}
              className="relative flex min-h-64 grow basis-0 items-center overflow-hidden rounded-2xl bg-white bg-linear-to-br from-white via-white to-black/25 transition-all hover:scale-102"
            >
              <h2 className="absolute top-6 left-6 z-2 md:right-6 md:left-auto">
                The CICS&#123;SG&#125;
              </h2>
              <Image
                src={"/images/TheCICSSG.png"}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
          {/* Documents */}
          <div className="h-72 overflow-hidden rounded-2xl bg-[url(/images/noiselowblack.png)] bg-white/90 bg-linear-to-br from-white via-white to-black/25 transition-all">
            <h2 className="pt-5 pl-5">Documents</h2>
            <div className="relative left-0 mx-auto max-w-4xl text-white *:absolute *:aspect-[9/16] *:w-3xs *:rounded-4xl *:border-2 *:border-white *:bg-neutral-800 *:bg-[url(/images/noise.png)] *:px-4 *:py-4 *:transition-all md:text-3xl *:md:w-xs *:md:px-6 xl:text-4xl *:2xl:scale-95 *:2xl:hover:scale-102">
              <Link
                href={"/documents/resolutions"}
                className="3xl:left-2 3xl:-rotate-25 3xl:top-24 top-25 left-2/12 z-4 scale-90 sm:top-20 sm:-left-4 sm:z-4 sm:scale-80 sm:-rotate-12 sm:text-center md:top-18 md:left-0 md:scale-70 md:-rotate-20 md:text-left md:hover:scale-73 lg:top-20 lg:left-6 lg:scale-80 lg:hover:scale-85 xl:top-14 xl:left-3 xl:scale-70 xl:-rotate-25 xl:hover:scale-75"
              >
                Resolutions
              </Link>
              <Link
                href={"/documents/executive-orders"}
                className="3xl:-rotate-10 3xl:left-[24.5%] 3xl:top-0 top-6 left-2/12 z-3 scale-80 sm:top-4 sm:left-1/12 sm:z-2 sm:scale-80 sm:-rotate-8 md:top-6 md:left-[24%] md:scale-70 md:hover:scale-73 lg:top-5 lg:left-3/12 lg:scale-80 lg:hover:scale-85 xl:top-0 xl:left-[22%] xl:scale-70 xl:hover:scale-75"
              >
                Executive Orders
              </Link>
              <Link
                href={"/documents/ordinances"}
                className="3xl:right-30 3xl: -top-10 right-1/6 z-2 scale-70 sm:-top-8 sm:right-2/12 sm:z-1 sm:scale-80 sm:rotate-3 md:right-[4%] md:top-2 md:scale-70 md:hover:scale-73 lg:top-0 lg:right-[14%] lg:scale-80 lg:hover:scale-85 xl:-top-4 xl:right-[10%] xl:scale-70 xl:hover:scale-75"
              >
                Ordinances
              </Link>
              <Link
                href={"/documents/formal-documents"}
                className="3xl:-right-10 3xl:rotate-20 -top-24 right-1/6 z-1 scale-60 sm:top-16 sm:-right-2 sm:z-3 sm:scale-80 sm:rotate-25 md:-right-16 md:scale-70 md:hover:scale-73 lg:-right-2 lg:scale-80 lg:hover:scale-85 xl:top-14 xl:-right-10 xl:scale-70 xl:rotate-20 xl:hover:scale-75"
              >
                Formal Documents
              </Link>
            </div>
          </div>
        </div>
        {/* Right Column 3 Rows */}
        <div className="flex grow-3 basis-0 flex-col gap-5">
          {/* Announcements */}
          <Link
            href={"/announcements"}
            className="flex min-h-96 grow-[2.5] basis-0 flex-col gap-5 overflow-hidden rounded-2xl bg-[url(/images/noiselowblack.png)] bg-white/90 bg-linear-to-br from-white via-white to-black/25 p-5 pb-12 transition-all hover:scale-102 md:min-h-fit"
          >
            <h2 className="lg:text-right">Announcements</h2>
            <div className="relative m-auto flex h-fit w-11/12 flex-col overflow-hidden rounded-2xl shadow-2xl">
              <ChevronDownIcon className="animate-infinite animate-duration-[2000ms] animate-delay-1000 animate-ease-in-out absolute bottom-0 left-1/2 size-8 -translate-x-1/2 animate-bounce" />
              <div className="no-scrollbar flex h-36 snap-y snap-mandatory flex-col overflow-y-scroll">
                {announcements?.map((data, i) => (
                  <div className="mb-10 h-full snap-center">
                    <div className="h-6 bg-black/50"></div>
                    <div className="h-30 py-4">
                      {/* Item */}
                      <div className="flex h-full flex-row items-center gap-2 px-4">
                        <h1 className="3xl:text-lg grow-[1.5] basis-0 text-lg font-bold md:text-2xl lg:text-lg">
                          {data.date}
                        </h1>
                        <div className="grow-3 basis-0 text-sm">
                          <h2 className="3xl:text-lg text-lg font-bold md:text-lg lg:text-sm">
                            {data.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
          {/* Events */}
          <Link
            href={"/events"}
            className="flex min-h-96 grow-3 basis-0 flex-col gap-5 overflow-hidden rounded-2xl bg-[url(/images/noiselowblack.png)] bg-white/90 bg-linear-to-br from-white via-white to-black/25 p-5 transition-all hover:scale-102 md:min-h-fit "
          >
            <h2 className="lg:text-right">Events</h2>
            <div className="carousel carousel-center rounded-box m-auto min-h-fit gap-4">
              {/* <div className="absolute top-0 left-0 w-full h-full bg-linear-90 from-blue-200/50 via-blue-200/0 to-blue-200/50"></div> */}
              {events &&
                events.map((data) => (
                  <div className="carousel-item" key={data.id}>
                    <Image
                      src={data.image}
                      alt=""
                      width={500}
                      height={500}
                      className="rounded-box h-72 w-fit border-2 border-black/70 object-contain "
                    />
                  </div>
                ))}
            </div>
          </Link>
          {/* Contact Us */}
          <Link
            href={"/contact-us"}
            className="relative flex min-h-48 grow-1 basis-0 flex-col justify-between overflow-hidden rounded-2xl bg-white/30 p-5 text-white transition-all hover:scale-102 md:min-h-fit bg-[url(/images/noise.png)]"
          >
            <span className="absolute -top-5 -left-5 z-0 -rotate-12 text-9xl">
              @
            </span>
            <h2 className="z-1 text-end font-bold">Contact Us</h2>
            <p className="z-1 text-end text-base font-normal">
              Got concerns or suggestions? <br /> Tell us—we're listening.
            </p>
            <div className="z-1 w-full rounded-xl border-1 border-white bg-neutral-800 py-1 text-center font-normal">
              cicssg@dlsud.edu.ph
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
