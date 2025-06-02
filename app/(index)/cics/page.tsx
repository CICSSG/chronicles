import NavCICS from "@/components/nav-cics";
import React from "react";

const Faculty = () => {
  return (
    <div className="flex flex-col gap-10 text-justify">
      <img
        src="https://placehold.co/600x400/000000/FFFFFF/png"
        alt=""
        className="h-96 rounded-xl object-cover"
      />
      <h1 className="text-3xl">About CICS</h1>
      <p className="text-xl font-normal">
        The College of Information and Computer Studies (CICS) is a leader in
        technological education, committed to academic excellence, innovation,
        and ethical standards. We foster a dynamic and inclusive environment
        where students, faculty, and industry partners work together to address
        and solve intricate technological issues. CICS inspires and prepares
        future leaders who excel in their professions and make meaningful
        contributions to the global digital landscape.
      </p>
<hr />
      <div className="flex flex-row justify-around gap-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl">Mission</h1>
          <p className="text-xl font-normal">
            To equip students with a thorough understanding, innovative
            capabilities, and strong ethical foundations in information and
            computer sciences. We aim to nurture a learning community dedicated
            to continuous education, technological progress, and positive
            societal impact.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl">Vision</h1>
          <p className="text-xl font-normal">
            To become a leader in information and computer studies, noted for
            our academic excellence, pioneering research, and significant
            community involvement. We strive to produce graduates who are
            competitive on a global scale and drive technological innovation and
            social progress.
          </p>
        </div>
      </div>

<hr />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Research Focus</h1>
        <p className="text-xl font-normal">
          The College of Information and Computer Studies (CICS) serves as a
          dynamic center for pioneering research at the intersection of
          technology and societal advancement. Harnessing the latest innovations
          in Information Technology (IT) and Computer Science (CS), we address
          pressing challenges and prepare our students to excel as future
          leaders in these evolving disciplines. Our faculty fosters an
          environment of academic excellence and professional growth. Our
          research initiatives align with global sustainability goals, including
          SDG 9 - Industry, Innovation, and Infrastructure, focusing on building
          resilient, inclusive technological foundations, and promoting
          innovation. Moreover, our dedication to SDG 4 - Quality Education
          ensures accessible, high-quality learning experiences for all. Through
          collaborative efforts supporting SDG 17 - Partnerships for the Goals,
          we engage with diverse stakeholders to enhance global sustainability
          and drive meaningful societal impact.
        </p>
      </div>
    </div>
  );
};

export default Faculty;
