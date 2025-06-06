import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex grow flex-col gap-5 text-2xl lg:flex-row max-w-full xl:max-w-10/12 m-auto">
        {/* Left 2 Columns */}
        <div className="flex grow-6 basis-0 flex-col gap-5">
          <div className="flex grow flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 p-5 transition-all md:flex-row md:items-center md:p-1">
            <div className="bgImage hidden overflow-hidden rounded-2xl md:block">
              <Image
                src={"/images/HeroPanther.png"}
                alt="CICS Panther"
                width={500}
                height={500}
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
              className="relative flex min-h-64 grow basis-0 items-center overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 transition-all hover:scale-102"
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
              className="relative flex min-h-64 grow basis-0 items-center overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 transition-all hover:scale-102"
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
          <div
            className="h-64 overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 transition-all"
          >
            <h2 className="pt-5 pl-5">Documents</h2>
            <div className="*md:text-2xl relative left-0 mx-auto max-w-4xl text-white *:absolute *:aspect-[9/16] *:w-3xs *:rounded-2xl *:border-2 *:border-white *:bg-neutral-800 *:bg-[url(/images/noise.png)] *:p-4 *:transition-all *:hover:scale-102 *:md:w-xs">
              <Link href={"/resolutions"} className="top-20 -left-4 z-4 scale-70 -rotate-18 text-center sm:scale-80 md:top-24 md:left-12 md:scale-90 md:-rotate-12 md:text-left xl:top-26 xl:scale-100">
                Resolutions
              </Link>
              <Link href={"/executive-orders"} className="top-4 left-4 z-2 scale-70 -rotate-8 sm:left-1/12 sm:scale-80 md:top-8 md:left-2/12 md:scale-90 xl:top-6 xl:left-1/5 xl:scale-100">
                Executive Orders
              </Link>
              <Link href={"/ordinances"} className="-top-8 -right-2 z-1 scale-70 rotate-3 sm:right-2/12 sm:scale-80 md:right-1/6 md:scale-90 lg:-top-7 lg:right-1/12 xl:right-2/12 xl:scale-100">
                Ordinances
              </Link>
              <Link href={"/formal-documents"} className="top-16 -right-10 z-3 scale-70 rotate-12 sm:-right-2 sm:scale-80 md:-right-12 md:scale-90 xl:-right-8 xl:scale-100">
                Formal Documents
              </Link>
            </div>
          </div>
        </div>
        {/* Right Column 3 Rows */}
        <div className="flex grow-3 basis-0 flex-col gap-5">
          {/* Announcements */}
          {/* TODO FIX LAYOUT ON SCREEN SIZES */}
          <Link
            href={"/announcements"}
            className="flex min-h-fit grow-3 basis-0 flex-col gap-5 overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 p-5 pb-12 transition-all hover:scale-102"
          >
            <h2 className="lg:text-right">Announcements</h2>
            <div className="relative m-auto flex h-fit w-11/12 flex-col overflow-hidden rounded-2xl shadow-2xl">
              <ChevronDownIcon className="absolute size-8 bottom-0 left-1/2 -translate-x-1/2 animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-1000 animate-ease-in-out"/>
              <div className="h-6 bg-blue-300"></div>
              <div className="no-scrollbar h-36 snap-y snap-mandatory overflow-y-scroll">
                {/* Item */}
                <div className="flex snap-center flex-row items-center gap-2 px-4 py-10">
                  <h1 className="text-md grow-1 basis-0 font-bold">
                    Apr 3 2025
                  </h1>
                  <div className="grow-3 basis-0 text-sm">
                    <h2 className="text-lg font-bold">
                      Day 2: CICS Game Update
                    </h2>
                    <p>
                      Our CICS Pioneers showcased their skills in various sports
                      today.
                    </p>
                  </div>
                </div>

                <div className="flex snap-center flex-row items-center gap-2 px-4 py-10">
                  <h1 className="text-md grow-1 basis-0 font-bold">
                    Apr 2 2025
                  </h1>
                  <div className="grow-3 basis-0 text-sm">
                    <h2 className="text-lg font-bold">
                      Schedule of Esports Games
                    </h2>
                    <p>
                      Pioneers, mark your calendars to cheer for our esports team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* Events */}
          <Link
            href={"/events"}
            className="flex min-h-fit grow-3 basis-0 flex-col gap-5 overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 p-5 transition-all hover:scale-102"
          >
            <h2 className="lg:text-right">Events</h2>
            <div className="carousel carousel-center rounded-box m-auto min-h-fit gap-4">
              <div className="carousel-item">
                <Image
                  src="/images/TextImage.jpg"
                  alt="Pizza"
                  width={500}
                  height={500}
                  className="rounded-box h-48 w-full object-cover"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/images/TextImage.jpg"
                  alt="Pizza"
                  width={500}
                  height={500}
                  className="rounded-box h-48 w-full object-cover"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/images/TextImage.jpg"
                  alt="Pizza"
                  width={500}
                  height={500}
                  className="rounded-box h-48 w-full object-cover"
                />
              </div>
            </div>
          </Link>
          {/* Contact Us */}
          <Link
            href={"/contact-us"}
            className="relative flex min-h-fit grow-1 basis-0 flex-col justify-between overflow-hidden rounded-2xl bg-neutral-500 p-5 text-white transition-all hover:scale-102"
          >
            <span className="absolute -top-5 -left-5 z-0 -rotate-12 text-9xl">
              @
            </span>
            <h2 className="z-1 text-end font-bold">Contact Us</h2>
            <h3 className="z-1 text-end text-base font-normal">
              Got concerns or suggestions? <br /> Tell us --we're listening.
            </h3>
            <div className="font-secondary z-1 w-full rounded-xl border-1 border-white bg-neutral-800 py-1 text-center font-normal">
              cicssg@dlsud.edu.ph
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
