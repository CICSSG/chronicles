"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import CampusDirectory from "@/components/campus-directory";
import { CampusInfo } from "@/components/public-documents-data";

// const eastCampus = [
//   {
//     id: 1,
//     name: "Rotunda (St. La Salle Marker)",
//     number: 1,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 2,
//     name: "Magdalo Gate",
//     number: 2,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 3,
//     name: "Magtagumpay Gate",
//     number: 3,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 4,
//     name: "Magpuri Gate",
//     number: 4,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 5,
//     name: "La Porteria De San Benildo",
//     number: 5,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 6,
//     name: "ICTC Building",
//     number: 6,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 7,
//     name: "Mariano Alvarez Hall",
//     number: 7,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 8,
//     name: "CTHM Building",
//     number: 8,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 9,
//     name: "Paulo Campos Hall",
//     number: 9,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 10,
//     name: "Julian Felipe Hall",
//     number: 10,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 11,
//     name: "Study Shed",
//     number: 11,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 12,
//     name: "Transportation Building",
//     number: 12,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 13,
//     name: "COS Building",
//     number: 13,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 14,
//     name: "Ayuntamiento De Gonzales",
//     number: 14,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 15,
//     name: "Residencia La Salle",
//     number: 15,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 16,
//     name: "Aklatang Emilio Aguinaldo (Annex Building)",
//     number: 16,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 17,
//     name: "Aklatang Emilio Agauinaldo (Old Building)",
//     number: 17,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 18,
//     name: "Antonio & Victoria Cojuangco Memorial Chapel of Our Lady of the Holy Rosary",
//     number: 18,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 19,
//     name: "National Bookstore / LCDC Building",
//     number: 19,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 20,
//     name: "Mila's Diner",
//     number: 20,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 21,
//     name: "Residencia Garage",
//     number: 21,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 22,
//     name: "Museo De La Salle",
//     number: 22,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 23,
//     name: "University Food Square",
//     number: 23,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 24,
//     name: "Guest House",
//     number: 24,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 25,
//     name: "Ladies Dormitory Complex",
//     number: 25,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 26,
//     name: "Men's Dormitory Complex",
//     number: 26,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 27,
//     name: "Museo Pavilion",
//     number: 27,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 28,
//     name: "Botanical Garden Park",
//     number: 28,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 29,
//     name: "Hotel Rafael",
//     number: 29,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 30,
//     name: "Centennial Hall",
//     number: 30,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 31,
//     name: "Campus Gourmet",
//     number: 31,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 32,
//     name: "CTHM Food Laboratory Building",
//     number: 32,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 33,
//     name: "Severino De Las Alas Hall (Alumni Building)",
//     number: 33,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 34,
//     name: "Batibot Student Lounge",
//     number: 34,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
//   {
//     id: 35,
//     name: "Lumina Bridge",
//     number: 35,
//     location: "Lorem ipsum",
//     services: ["Lorem", "Ipsum", "Dolor"],
//     organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     image: "/images/DLSUD-rotonda.jpg",
//   },
// ];

export default function Page() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";
  const [isLoaded, setIsLoaded] = useState(false);
  const [document, setDocument] = useState<any | null>(null);

  const [eastDocuments, setEastDocuments] = useState<any[] | undefined>(
    undefined,
  );
  const [westDocuments, setWestDocuments] = useState<any[] | undefined>(
    undefined,
  );

  useEffect(() => {
    CampusInfo().then(({ east_documents, west_documents }) => {
      setEastDocuments(east_documents ?? undefined);
      setWestDocuments(west_documents ?? undefined);
    });
  }, [slug]);

  useEffect(() => {
    console.log("East Documents:", eastDocuments);
    console.log("West Documents:", westDocuments);
    setDocument(eastDocuments?.find((doc) => String(doc.id) === slug) || null);
  }, [eastDocuments]);

  useEffect(() => {
    setIsLoaded(true);
  }, [document]);

  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl lg:flex-row">
      <div className="flex w-full flex-col gap-8 xl:rounded-xl xl:bg-white/80 xl:p-8">
        <div className="flex flex-col gap-4">
          <div className="items-left flex flex-col justify-between gap-4 lg:flex-row lg:gap-0">
            <a
              className="flex flex-row items-center text-center text-xl font-semibold text-black/60 hover:text-black/80 xl:text-left"
              href="/cics/blueprint"
            >
              {<ChevronLeftIcon className="inline size-8" />} Back to Blueprint
            </a>
            <h1 className="text-center text-2xl xl:text-left">
              {isLoaded ? (
                document?.name
              ) : (
                <div className="flex flex-row gap-2">
                  <div className="skeleton float-left mr-4 h-4 w-60"></div>
                </div>
              )}
            </h1>
          </div>
          <div className="block">
            {isLoaded ? (
              <div
                className="hero h-fit min-h-96 place-items-start overflow-hidden rounded-3xl"
                style={{
                  backgroundImage: `url(${document?.image})`,
                }}
              >
                <div className="hero-overlay bg-linear-230 from-black/0 from-30% via-black/20 via-50% to-black/75 to-80%"></div>
                <div className="hero-content text-neutral-content my-auto">
                  <div className="max-w-sm">
                    <p className="mb-5 text-justify font-normal">
                      {document?.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2">
                <div className="skeleton float-left mr-4 h-80 w-full"></div>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">Location</h1>
              </div>
              <div className="collapse-content text-justify text-lg font-normal">
                {document && document.location}
              </div>
            </div>
          </div>

          {/* Services */}
          {document && document.services && document.services.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
                <input type="checkbox" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                  <h1 className="text-2xl font-bold">Services Offered</h1>
                </div>
                <div className="collapse-content text-sm">
                  <ul className="list list-inside list-disc gap-4 *:text-lg">
                    {document &&
                      document.services.map((data: string, i: number) => (
                        <li key={i} className="text-justify font-normal">
                          {data}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Organization */}
          {document &&
            document.organization &&
            document.organization.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-black/2 from-60% to-black/10 transition duration-300 hover:scale-101 hover:from-black/10">
                  <input type="checkbox" name="my-accordion-2" />
                  <div className="collapse-title font-semibold">
                    <h1 className="text-2xl font-bold">Organizations</h1>
                  </div>
                  <div className="collapse-content text-sm">
                    <ul className="list list-inside list-disc gap-4 *:text-lg">
                      {document &&
                        document.organization.map((data: string, i: number) => (
                          <li key={i} className="text-justify font-normal">
                            {data}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>

        <hr className="border-2 border-black/40" />
        <CampusDirectory
          isLoaded={isLoaded}
          east_campus={eastDocuments}
          west_campus={westDocuments}
        />
      </div>
    </div>
  );
}
