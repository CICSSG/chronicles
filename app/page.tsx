import NavLinks from "@/components/nav-links";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default async function Home() {
  const bgImage = (
    <Image
      src="/images/HeroBG.jpg"
      width={1600}
      height={500}
      alt="Picture of the author"
    />
  );
  return (
    <>
      <div className="font-space flex h-full w-full flex-col items-center bg-neutral-800 font-semibold">
        <div className="my-10 flex max-w-11/12 flex-col gap-5 xl:max-w-9/12">
          <div className="flex w-full flex-row justify-between px-10 py-2 text-xl text-white">
            <NavLinks />
          </div>
          <div className="flex grow flex-col gap-5 text-2xl lg:flex-row">
            {/* Left 2 Columns */}
            <div className="flex grow-6 basis-0 flex-col gap-5">
              <div className="flex grow flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br from-white via-white to-blue-100 p-5 transition-all hover:scale-102 md:flex-row md:items-center md:p-1">
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
                  href={""}
                  className="relative flex min-h-64 grow basis-0 items-center overflow-hidden rounded-2xl bg-neutral-200 transition-all hover:scale-102"
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
                  href={""}
                  className="relative flex min-h-64 grow basis-0 items-center overflow-hidden rounded-2xl bg-neutral-200 transition-all hover:scale-102"
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
              <Link
                href={""}
                className="h-64 overflow-hidden rounded-2xl bg-neutral-200 p-5 transition-all"
              >
                <h2>Documents</h2>
                <div className="relative text-white *:absolute *:aspect-[9/16] *:w-3xs *:rounded-2xl *:border-2 *:border-white *:bg-neutral-800 *:bg-[url(/images/noise.png)] *:p-4 *:transition-all *:hover:scale-102 *:md:w-xs">
                  <div className="top-28 left-12 z-4 -rotate-12">
                    Resolutions
                  </div>
                  <div className="top-8 left-2/12 z-2 -rotate-8">
                    Executive Orders
                  </div>
                  <div className="-top-8 right-2/12 z-1 rotate-3">
                    Ordinances
                  </div>
                  <div className="top-20 -right-0 z-3 rotate-12 md:-right-12">
                    Formal Documents
                  </div>
                </div>
              </Link>
            </div>
            {/* Right Column 3 Rows */}
            <div className="flex grow-3 basis-0 flex-col gap-5">
              {/* Announcements */}
              <Link
                href={""}
                className="flex min-h-fit grow-3 basis-0 flex-col gap-5 overflow-hidden rounded-2xl bg-neutral-200 p-5 pb-12 transition-all hover:scale-102"
              >
                <h2 className="lg:text-right">Announcements</h2>
                <div className="m-auto flex h-fit w-11/12 flex-col overflow-hidden rounded-2xl shadow-2xl">
                  <div className="h-6 bg-blue-300"></div>
                  <div className="flex flex-row items-center gap-2 px-4 py-8">
                    <h1 className="text-md grow-1 basis-0 font-bold">
                      Apr 3 2025
                    </h1>
                    <div className="grow-3 basis-0 text-sm">
                      <h2 className="text-lg font-bold">
                        Day 2: CICS Game Update
                      </h2>
                      <p>
                        Our CICS Pioneers showcased their skills in various
                        sports today.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              {/* Events */}
              <Link
                href={""}
                className="flex flex-col min-h-fit grow-3 basis-0 gap-5 overflow-hidden rounded-2xl bg-neutral-200 p-5 transition-all hover:scale-102"
              >
                <h2 className="lg:text-right">Events</h2>
                <div className="carousel carousel-center rounded-box min-h-fit gap-4 m-auto shadow-2xl">
                  <div className="carousel-item">
                    <Image
                      src="/images/TextImage.jpg"
                      alt="Pizza"
                      width={500}
                      height={500}
                      className="object-cover w-full h-48 rounded-box"
                    />
                  </div>
                  <div className="carousel-item">
                    <Image
                      src="/images/TextImage.jpg"
                      alt="Pizza"
                      width={500}
                      height={500}
                      className="object-cover w-full h-48 rounded-box"
                    />
                  </div>
                  <div className="carousel-item">
                    <Image
                      src="/images/TextImage.jpg"
                      alt="Pizza"
                      width={500}
                      height={500}
                      className="object-cover w-full h-48 rounded-box"
                    />
                  </div>
                </div>
              </Link>
              {/* Contact Us */}
              <Link
                href={""}
                className="relative flex min-h-fit grow-1 basis-0 flex-col overflow-hidden rounded-2xl bg-neutral-500 p-5 text-white transition-all hover:scale-102"
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

          {/* Footer */}
          <div className="flex flex-col gap-12 justify-around overflow-hidden rounded-2xl bg-neutral-100 p-8 py-12 text-2xl">
            <div className="flex flex-col gap-6">
              <h1 className="font-extrabold text-3xl">[Chronicles]</h1>
              <div>
                <h2 className="text-xl">Address</h2>
                <h3 className="font-medium text-lg">PCH 102, Paolo Campus Hall, DBB-B, 4115 West Ave, Dasmariñas, Cavite</h3>
              </div>
              <div>
                <h2 className="text-xl">Email us at:</h2>
                <h3 className="font-medium text-lg underline">cicssg@dlsud.edu.ph</h3>
              </div>
              <div className="flex flex-row gap-4">
                <a href=""><FaFacebook/></a>
                <a href=""><FaInstagram/></a>
                <a href=""><FaLinkedin/></a>
              </div>
            </div>

            <div className="flex flex-row justify-between text-sm font-normal">
              <div>@2025 CICSSG. All rights reserved.</div>
              <div className="flex flex-row gap-4 *:underline">
                <a href="">Privacy Policy</a>
                <a href="">Terms of Service</a>
                <a href="">Cookies Settings</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
