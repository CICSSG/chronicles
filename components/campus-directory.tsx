"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const eastCampus = [
  {
    id: 1,
    name: "Rotunda (St. La Salle Marker)",
    number: 1,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 2,
    name: "Magdalo Gate",
    number: 2,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 3,
    name: "Magtagumpay Gate",
    number: 3,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 4,
    name: "Magpuri Gate",
    number: 4,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 5,
    name: "La Porteria De San Benildo",
    number: 5,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 6,
    name: "ICTC Building",
    number: 6,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 7,
    name: "Mariano Alvarez Hall",
    number: 7,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 8,
    name: "CTHM Building",
    number: 8,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 9,
    name: "Paulo Campos Hall",
    number: 9,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 10,
    name: "Julian Felipe Hall",
    number: 10,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 11,
    name: "Study Shed",
    number: 11,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 12,
    name: "Transportation Building",
    number: 12,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 13,
    name: "COS Building",
    number: 13,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 14,
    name: "Ayuntamiento De Gonzales",
    number: 14,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 15,
    name: "Residencia La Salle",
    number: 15,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 16,
    name: "Aklatang Emilio Aguinaldo (Annex Building)",
    number: 16,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 17,
    name: "Aklatang Emilio Agauinaldo (Old Building)",
    number: 17,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 18,
    name: "Antonio & Victoria Cojuangco Memorial Chapel of Our Lady of the Holy Rosary",
    number: 18,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 19,
    name: "National Bookstore / LCDC Building",
    number: 19,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 20,
    name: "Mila's Diner",
    number: 20,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 21,
    name: "Residencia Garage",
    number: 21,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 22,
    name: "Museo De La Salle",
    number: 22,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 23,
    name: "University Food Square",
    number: 23,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 24,
    name: "Guest House",
    number: 24,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 25,
    name: "Ladies Dormitory Complex",
    number: 25,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 26,
    name: "Men's Dormitory Complex",
    number: 26,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 27,
    name: "Museo Pavilion",
    number: 27,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 28,
    name: "Botanical Garden Park",
    number: 28,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 29,
    name: "Hotel Rafael",
    number: 29,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 30,
    name: "Centennial Hall",
    number: 30,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 31,
    name: "Campus Gourmet",
    number: 31,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 32,
    name: "CTHM Food Laboratory Building",
    number: 32,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 33,
    name: "Severino De Las Alas Hall (Alumni Building)",
    number: 33,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 34,
    name: "Batibot Student Lounge",
    number: 34,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
  {
    id: 35,
    name: "Lumina Bridge",
    number: 35,
    location: "Lorem ipsum",
    services: ["Lorem", "Ipsum", "Dolor"],
    organization: ["Lorem Ipsum Org", "Another Org", "Third Org"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/DLSUD-rotonda.jpg",
  },
];

export default function CampusDirectory() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-80">
          East Campus
        </li>

        {eastCampus.map((data, i) => (
          <li className="list-row" key={i}>
            <div className="text-4xl font-light tabular-nums opacity-30 my-auto">
              {String(data.number).padStart(2, "0")}
            </div>
            <div className="my-auto">{data.name}</div>
            <a
              className="btn btn-square btn-ghost my-auto"
              href={"/cics/blueprint/" + data.id}
            >
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-80">
          West Campus
        </li>
        {Array.from({ length: 5 }).map((_, i) => (
          <li className="list-row" key={i}>
            <div className="text-4xl font-light tabular-nums opacity-30">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="my-auto">Gregoria Montoya Hall</div>
            <a
              className="btn btn-square btn-ghost"
              href="/cics/blueprint"
              target="_blank"
            >
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
