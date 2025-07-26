import Image from "next/image";

export default function Departments() {
  return (
    <div className="grid grid-cols-1 gap-4 *:xl:rounded-xl *:xl:bg-white/80 *:xl:p-8">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Departments</h2>
        </div>
        <hr />

        <div className="">
          <Image
            src={"/images/CSD.png"}
            alt=""
            width={1000}
            height={500}
            className="float-left mr-4 mb-4 h-72 w-full grow basis-0 rounded-xl border-2 border-black/40 object-cover shadow-lg md:mb-0 md:w-1/2"
          />

          <h1 className="mb-4 text-2xl xl:text-3xl font-bold">
            Computer Science Department
          </h1>
          <p className="text-justify text-lg/10 font-normal">
            The Computer Science Department (CSD) promotes courses in Computer
            Science with specialization in Game Development and Intelligent
            Systems. It molds students into becoming computer scientists by
            providing them with core computer science courses as well as a
            variety of application and interdisciplinary areas in computational
            thinking. The department educates students for computing professions
            as well as graduate studies. Course requirements guarantee that
            students obtain teaching in both practical and theoretical parts of
            computer science.
          </p>
          <hr />

          <div className="flex grow basis-0 flex-col justify-between gap-4"></div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl xl:text-3xl font-bold">Objectives</h1>
          <ul className="flex list-disc flex-col gap-3 pl-6 text-justify *:text-lg *:font-normal">
            <li>
              Prepare students to be highly competent in aspects of computing
              concepts and theories, algorithmic foundations, and new
              developments in computer science.
            </li>
            <li>
              Train students in the discipline of software engineering, focusing
              on the effective design and implementation of quality software
              products by integrating the knowledge in artificial intelligence
              and game development.
            </li>
            <li>
              Imbibe to students a sense of excellence and Christian values that
              are the center of Lasallian culture in educating students.
            </li>
          </ul>
        </div>

        <hr />

        <div className="">
          <Image
            src={"/images/ITD.png"}
            alt=""
            width={1000}
            height={500}
            className="float-right mb-4 ml-4 h-72 w-full grow basis-0 rounded-xl border-2 border-black/40 object-cover shadow-lg md:mb-0 md:w-1/2"
          />

          <h1 className="mb-4 text-2xl xl:text-3xl font-bold">
            Information Technology Department
          </h1>
          <p className="text-justify text-lg/10 font-normal">
            The Information Technology Department (ITD) is part of the College
            of Science and is in charge of overseeing the BS Information
            Technology program with specialization in Web Development and
            Network Track. Its faculty is specialized and has certifications in
            Networking, Mobile and Web Programming, Business and Data Analytics.
          </p>
          <hr />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl xl:text-3xl font-bold">Objectives</h1>
          <ul className="flex list-disc flex-col gap-3 pl-6 text-justify *:text-lg *:font-normal">
            <li>
              Prepare students to be proficient in many computing theoretical
              and application areas.
            </li>
            <li>
              Offer students current Information Technology courses to aid in
              acquiring the skills required for rewarding careers in the sector.
            </li>
            <li>
              Train students how to conduct research, critical thinking, and
              abstract reasoning.
            </li>
            <li>
              Imbibe to students a sense of excellence and Christian values that
              are at the center of Lasallian culture in educating students.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
