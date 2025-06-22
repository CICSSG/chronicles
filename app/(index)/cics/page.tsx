import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="grid grid-cols-1 gap-4 *:xl:rounded-xl *:xl:bg-white/80 *:xl:p-8">
      <div className="flex flex-col gap-10 text-justify">
        <Image
          src="/images/DLSUD-rotonda.jpg"
          width={1000}
          height={500}
          alt=""
          className="h-96 w-full rounded-xl border-2 border-black/40 object-cover shadow-lg"
        />
        <h1 className="text-3xl">About CICS</h1>
        <p className="text-xl font-normal">
          The College of Information and Computer Studies (CICS) is a leader in
          technological education, committed to academic excellence, innovation,
          and ethical standards. We foster a dynamic and inclusive environment
          where students, faculty, and industry partners work together to
          address and solve intricate technological issues. CICS inspires and
          prepares future leaders who excel in their professions and make
          meaningful contributions to the global digital landscape.
        </p>
        <hr />
        <div className="flex flex-col lg:flex-row justify-around gap-16">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-3xl">Mission</h1>
            <p className="text-xl font-normal">
              To equip students with a thorough understanding, innovative
              capabilities, and strong ethical foundations in information and
              computer sciences. We aim to nurture a learning community
              dedicated to continuous education, technological progress, and
              positive societal impact.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-3xl">Vision</h1>
            <p className="text-xl font-normal">
              To become a leader in information and computer studies, noted for
              our academic excellence, pioneering research, and significant
              community involvement. We strive to produce graduates who are
              competitive on a global scale and drive technological innovation
              and social progress.
            </p>
          </div>
        </div>

        <hr />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Research Focus</h1>
          <p className="text-xl font-normal">
            The College of Information and Computer Studies (CICS) serves as a
            dynamic center for pioneering research at the intersection of
            technology and societal advancement. Harnessing the latest
            innovations in Information Technology (IT) and Computer Science
            (CS), we address pressing challenges and prepare our students to
            excel as future leaders in these evolving disciplines. Our faculty
            fosters an environment of academic excellence and professional
            growth. Our research initiatives align with global sustainability
            goals, including SDG 9 - Industry, Innovation, and Infrastructure,
            focusing on building resilient, inclusive technological foundations,
            and promoting innovation. Moreover, our dedication to SDG 4 -
            Quality Education ensures accessible, high-quality learning
            experiences for all. Through collaborative efforts supporting SDG 17
            - Partnerships for the Goals, we engage with diverse stakeholders to
            enhance global sustainability and drive meaningful societal impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
