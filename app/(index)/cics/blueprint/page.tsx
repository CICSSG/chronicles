import CampusDirectory from "@/components/campus-directory";
import Image from "next/image";

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

export default function Blueprint() {
  
  return (
    <div className="grid grid-cols-1 gap-4 *:xl:rounded-xl *:xl:bg-white/80 *:xl:p-8">
      <div className="flex flex-col gap-10 text-justify">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Pioneer's Blueprint</h1>
          <p className="text-justify text-lg font-normal">
            Naliligaw ka na ba? kawawa ka naman bui
          </p>
          <hr />
        </div>
        <Image
          src="/images/campus-map.jpg"
          width={1000}
          height={500}
          alt=""
          className="h-fit w-full rounded-xl border-2 border-black/40 object-cover shadow-lg"
        />

        <CampusDirectory />
      </div>
    </div>
  );
}
