import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface orgData {
  title: string;
  image: string;
  link: string;
  description: string;
}

const data: orgData[] = [
  {
    title: "CICSSG",
    image: "/images/CICSSG.png",
    link: "https://www.facebook.com/DLSUD.CICSSG",
    description:
      "The College of Information and Computer Studies Student Government (CICSSG) is the official student government within the College of Information and Computer Studies (CICS) at DLSU-D, focused on representing and serving the CICS student body. CICSSG works to ensure that students' voices are heard, supports academic and extracurricular activities, and helps create a positive and inclusive environment for all CICS students.",
  },
  {
    title: "CSPC",
    image: "/images/CSPCLogo.jpg",
    link: "https://www.facebook.com/DLSUD.CSPC",
    description:
      "The Computer Studies Program Council (CSPC) is the official program council focused on addressing the educational and developmental needs of the Computer Science department. As the voice of Computer Science students, CSPC works to represent their interests, providing opportunities for growth through various programs, events, and initiatives.",
  },
  {
    title: "ITPC",
    image: "/images/ITPCLogo.jpg",
    link: "https://www.facebook.com/DLSUD.ITPC",
    description:
      "The Information Technology Program Council (ITPC) is the official program council representing the Information Technology department. As the leading voice for IT students, ITPC empowers individuals to achieve excellence by advocating for their needs, fostering collaboration, and promoting professional growth.",
  },
  {
    title: "EVRLAST",
    image: "/images/EVRLASTLogo.jpg",
    link: "https://www.facebook.com/share/18uiAw1okp/",
    description:
      "EVRLAST is a dance organization formed by a collective of students from the Computer Science and Information Technology departments. It brings students together to express their creativity and showcase their dance talents.",
  },
];


export default function StudentOrganization() {
  return (
    <div className="grid grid-cols-1 gap-4 *:rounded-xl *:bg-white/80 *:p-8 lg:grid-cols-2">
      {data.map((data, i) => (
        <div key={i} className="flex flex-col gap-4 p-6">
          <Image
            src={data.image}
            alt=""
            width={300}
            height={180}
            className="h-90 w-full rounded-xl border-2 border-black/40 bg-white object-contain shadow-lg"
          />
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <Link
              href={data.link}
              target="_blank"
              className="text-md flex flex-row items-center rounded bg-black/90 px-3 py-2 font-normal text-nowrap text-white"
            >
              Read More <ChevronRight className="size-6" />{" "}
            </Link>
          </div>
          <hr />
          <p className="text-justify text-lg font-normal">{data.description}</p>
        </div>
      ))}
    </div>
  );
}
