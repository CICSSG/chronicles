import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function StudentOrganization() {
  return (
    <div className="grid grid-cols-1 gap-4 *:rounded-xl *:bg-white/80 *:p-8 lg:grid-cols-2">
      {/* CICSSG */}
      <div className="flex flex-col gap-4 p-6">
        <Image
          src={"/images/CICSSG.png"}
          alt=""
          width={300}
          height={180}
          className="h-90 w-full rounded-xl border-2 border-black/40 bg-white object-contain shadow-lg"
        />
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">CICSSG</h1>
          <Link
            href={"https://www.facebook.com/DLSUD.CICSSG"}
            target="_blank"
            className="text-md flex flex-row items-center rounded bg-black/90 px-3 py-2 font-normal text-nowrap text-white"
          >
            Read More <ChevronRight className="size-6" />{" "}
          </Link>
        </div>
        <hr />
        <p className="text-justify text-lg font-normal">
          The College of Information and Computer Studies Student Government
          (CICSSG) is the official student government within the College of
          Information and Computer Studies (CICS) at DLSU-D, focused on
          representing and serving the CICS student body. CICSSG works to ensure
          that students' voices are heard, supports academic and extracurricular
          activities, and helps create a positive and inclusive environment for
          all CICS students.
        </p>
      </div>

      {/* CSPC */}
      <div className="flex flex-col gap-4 p-6">
        <Image
          src={"/images/CSPCLogo.jpg"}
          alt=""
          width={300}
          height={180}
          className="h-90 w-full rounded-xl border-2 border-black/40 bg-white object-contain shadow-lg"
        />
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">CSPC</h1>
          <Link
            href={"https://www.facebook.com/DLSUD.CSPC"}
            target="_blank"
            className="text-md flex flex-row items-center rounded bg-black/90 px-3 py-2 font-normal text-nowrap text-white"
          >
            Read More <ChevronRight className="size-6" />{" "}
          </Link>
        </div>
        <hr />
        <p className="text-justify text-lg font-normal">
          The Computer Studies Program Council (CSPC) is the official program
          council focused on addressing the educational and developmental needs
          of the Computer Science department. As the voice of Computer Science
          students, CSPC works to represent their interests, providing
          opportunities for growth through various programs, events, and
          initiatives.
        </p>
      </div>

      {/* ITPC */}
      <div className="flex flex-col gap-4 p-6">
        <Image
          src={"/images/ITPCLogo.jpg"}
          alt=""
          width={300}
          height={180}
          className="h-90 w-full rounded-xl border-2 border-black/40 bg-white object-contain shadow-lg"
        />
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">ITPC</h1>
          <Link
            href={"https://www.facebook.com/DLSUD.ITPC"}
            target="_blank"
            className="text-md flex flex-row items-center rounded bg-black/90 px-3 py-2 font-normal text-nowrap text-white"
          >
            Read More <ChevronRight className="size-6" />{" "}
          </Link>
        </div>
        <hr />
        <p className="text-justify text-lg font-normal">
          The Information Technology Program Council (ITPC) is the official
          program council representing the Information Technology department. As
          the leading voice for IT students, ITPC empowers individuals to
          achieve excellence by advocating for their needs, fostering
          collaboration, and promoting professional growth.
        </p>
      </div>

      {/* EVRLAST */}
      <div className="flex flex-col gap-4 p-6">
        <Image
          src={"/images/EVRLASTLogo.jpg"}
          alt=""
          width={300}
          height={180}
          className="h-90 w-full rounded-xl border-2 border-black/40 bg-white object-contain shadow-lg"
        />
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">EVRLAST</h1>
          <Link
            href={"https://www.facebook.com/share/18uiAw1okp/"}
            target="_blank"
            className="text-md flex flex-row items-center rounded bg-black/90 px-3 py-2 font-normal text-nowrap text-white"
          >
            Read More <ChevronRight className="size-6" />{" "}
          </Link>
        </div>
        <hr />
        <p className="text-justify text-lg font-normal">
          EVRLAST is a dance organization formed by a collective of students from the Computer Science and Information Technology departments. It brings students together to express their creativity and showcase their dance talents.
        </p>
      </div>
    </div>
  );
}
