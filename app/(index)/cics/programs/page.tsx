interface ProgramData {
  title: string;
  description: string;
  accreditation: string;
  imageUrl: string;
  courseOverview: string[];
  coreSubjects: {};
  eligibility: {};
  curriculum: string;
}

const programDescription =
  "The College of Information and Computer Studies (CICS) at De La Salle University-Dasmarinas (DLSU-D) currently offers the Bachelor of Science in Computer Science and Bachelor of Science in Information Technology programs. Furthermore, CICS is planning to introduce additional programs to its academic offerings.";

const programs: ProgramData[] = [
  {
    title: "Bachelor of Science in Computer Science",
    description:
      "The Bachelor of Science in Computer Science program prepares students to be highly competent and certified in the areas of computing theory and applications; trains them in the areas of abstract reasoning, analytical thinking and research; with track in: Robotics or Mobile and Game Development. Graduates of this program may pursue a meaningful career as an applications developer, CS instructor, researcher, trainer, database programmer/design, mobile applications, games developer or system analyst. ",
    accreditation: "Accredited by PAASCU - Level 1",
    imageUrl: "/images/ProgramsPlaceholder.png",
    courseOverview: [
      "The Bachelor of Science in Computer Science program prepares students to be highly competent and certified in the areas of computing theory and applications; trains them in the areas of abstract reasoning, analytical thinking and research; with track in: Robotics or Mobile and Game Development. Graduates of this program may pursue a meaningful career as an applications developer, CS instructor, researcher, trainer, database programmer/design, mobile applications, games developer or system analyst.",
    ],
    coreSubjects: {
      "Major Subjects": [
        "Introduction to Computing",
        "Fundamentals of Programming",
        "Intermediate Programming",
        "Data Structures and Algorithms",
        "Information Management",
        "Applications Development and Emerging Technologies",
        "Object-oriented Programming",
        "Human Computer Interaction",
        "Information Assurance and Security",
        "Social Issues and Professional Practice",
        "Discrete Structures",
        "Programming Languages",
        "Algorithms and Complexity",
        "Architecture and Organization",
        "Automata Theory and Formal Languages",
        "Networks and Communications",
        "Operating Systems",
        "Practicum",
        "Software Engineering",
        "Thesis",
        "Computational Science",
        "Graphics and Visual Computing",
        "Parallel and Distributed Computing",
        "Intelligent Systems",
        "System Fundamentals",
      ],
      "Additional Domains for Intelligent Systems Track": [
        "Introduction to Computing",
        "Introduction to Statistical Machine Learning",
        "Introduction to Parallel Computing",
        "Advanced Topics in Artificial Intelligence",
        "Computer Vision/Image Processing",
        "Advanced Topics In Algorithms",
        "Special Topics in Artificial Intelligence",
      ],
      "Additional Domains for Game Development Track": [
        "Introduction to Game Programming",
        "Game Design Principles and Practice",
        "Computer Animation and Simulation",
        "Advanced Game Programming",
        "Immersive Game Development",
        "3D Graphics and Animation",
      ],
    },
    eligibility: {
      "College Freshmen": [
        "An applicant who has completed Senior High School and has not taken any college course, or",
        "An applicant who has completed equivalent Secondary Education from any school abroad and has not taken any college course, or",
        "A passer of Alternative Learning System (ALS) with certification of eligibility to be admitted to college.",
      ],
      "College Transferee": [
        "An applicant who has taken college programs or units not more than 75% of his/her curriculum in other CHED recognized colleges or universities, or",
        "An applicant who has taken college programs or units not more than 75% of his/her curriculum in colleges or universities abroad, OR",
        "An applicant who has taken vocational or any special training in recognized colleges or universities abroad, OR",
        "An applicant who has officially enrolled in any degree or certificate programs after High School.",
      ],
      "Second Course Taker": [
        "An applicant who has completed any college degree from any CHEd recognized college or university, or",
        "An applicant who has completed any college degree from college or university abroad.",
      ],
    },
    curriculum:
      "The BS in Computer Science curriculum at DLSU-D covers foundational computer science courses such as programming, data structures, software engineering, algorithms, and computer systems. It also includes specialization tracks in Intelligent Systems and Game Development, with elective courses tailored to each. The curriculum is designed to prepare students for careers in software development, AI, and tech innovation.",
  },
  {
    title: "Bachelor of Science in Information Technology",
    description:
      "The Bachelor of Science in Information Technology program focuses on the rigorous training of students with the latest IT concepts and applications. It provides a practical approach in studying the various facets and latest applications of the IT industry; with track in: Network Technology or Software Technology.",
    accreditation: "Accredited by PAASCU - Level 2",
    imageUrl: "/images/ProgramsPlaceholder.png",
    courseOverview: [
      "The Bachelor of Science in Information Technology program focuses on the rigorous training of students with the latest IT concepts and applications. It provides a practical approach in studying the various facets and latest applications of the IT industry; with track in: Network Technology or Software Technology.",
      "Graduates of this program may pursue a meaningful career as a database administrator, entrepreneur in the IT industry, information security administrator, IT instructor, programmer, trainer or researcher. They can also become successful as researchers, information security/network administrators, technical support specialists or web administrators, web masters or web developers.",
    ],
    coreSubjects: {
      "Major Subjects": [
        "Introduction to Computing",
        "Fundamentals of Programming",
        "Intermediate Programming",
        "Data Structures and Algorithms",
        "Applications Development and Emerging Technologies",
        "Human Computer Interaction",
        "Discrete Math",
        "Fundamentals of Database Systems",
        "Quantitative Methods",
        "Information Assurance and Security",
        "Networking",
        "Integrative Programming and Technologies",
        "Social and Professional Issues",
        "Capstone Project",
        "System Integration and Architecture",
        "System Administration and Maintenance",
        "Practicum",
      ],
      Electives: [
        "Object-Oriented Programming",
        "Platform Technologies",
        "Web Systems and Technologies",
      ],
      "Additional Domains for Web Design and Applications Development": [
        "Web Development",
        "Mobile Enterprise Systems",
        "Multimedia Systems",
        "Internet Languages and Tools 1 and 2",
        "Graphic Design",
      ],
      "Additional Domains for Game Development Track": [
        "Internet of Things",
        "CISCO Networking Semester 1-4",
        "Big Data and Analytics",
      ],
    },
    eligibility: {
      "College Freshmen": [
        "An applicant who has completed Senior High School and has not taken any college course, or",
        "An applicant who has completed equivalent Secondary Education from any school abroad and has not taken any college course, or",
        "A passer of Alternative Learning System (ALS) with certification of eligibility to be admitted to college.",
      ],
      "College Transferee": [
        "An applicant who has taken college programs or units not more than 75% of his/her curriculum in other CHED recognized colleges or universities, or",
        "An applicant who has taken college programs or units not more than 75% of his/her curriculum in colleges or universities abroad, OR",
        "An applicant who has taken vocational or any special training in recognized colleges or universities abroad, OR",
        "An applicant who has officially enrolled in any degree or certificate programs after High School.",
      ],
      "Second Course Taker": [
        "An applicant who has completed any college degree from any CHEd recognized college or university, or",
        "An applicant who has completed any college degree from college or university abroad.",
      ],
    },
    curriculum:
      "De La Salle University-Dasmariñas (DLSU-D) offers a Bachelor of Science in Information Technology (BSIT) program designed to provide students with comprehensive training in the latest IT concepts and applications. The curriculum emphasizes practical approaches to various facets of the IT industry, preparing graduates for careers such as database administrators, IT entrepreneurs, information security administrators, IT instructors, programmers, trainers, researchers, technical support specialists, web administrators, webmasters, or web developers.",
  },
];

export default function Programs() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/80 p-8">
      <h1 className="text-3xl font-bold">Programs</h1>
      <p className="text-justify text-lg font-normal">{programDescription}</p>

      {programs.map((data, i: number) => (
        <div key={i} className="flex flex-col gap-4">
          <hr />
          <div
            className="hero h-96 place-items-start overflow-hidden rounded-3xl"
            style={{
              backgroundImage: `url(${data.imageUrl})`,
            }}
          >
            <div className="hero-overlay bg-linear-230 from-black/0 from-30% via-black/40 via-50% to-black to-60%"></div>
            <div className="hero-content text-neutral-content my-auto">
              <div className="max-w-xl">
                <h1 className="mb-5 text-3xl font-bold">{data.title}</h1>
                <p className="mb-5 text-justify font-normal">
                  {data.description}
                </p>
                <p className="mb-5 font-normal underline underline-offset-2">
                  {data.accreditation}
                </p>
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-neutral-100 from-60% to-blue-50 transition duration-300 hover:scale-101 hover:from-blue-50">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">Course Overview</h1>
              </div>
              <div className="collapse-content text-sm">
                <ul className="list gap-4 *:text-lg">
                  {data.courseOverview.map((data, i) => (
                    <li key={i} className="text-justify font-normal">
                      {data}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Core Subjects */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-neutral-100 from-60% to-blue-50 transition duration-300 hover:scale-101 hover:from-blue-50">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">Core Subjects</h1>
              </div>
              <div className="collapse-content text-sm">
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(data.coreSubjects).map(
                    ([name, data]: [string, any], i: number) => (
                      <div key={i}>
                        <h2 className="mb-2 text-lg font-bold">{name}</h2>
                        <ul className="list gap-2 *:text-lg *:font-normal">
                          {data.map((subjectData: string, i: number) => (
                            <li key={i}>- {subjectData}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility and Requirements */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-neutral-100 from-60% to-blue-50 transition duration-300 hover:scale-101 hover:from-blue-50">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">
                  Eligibility and Requirements
                </h1>
              </div>
              <div className="collapse-content text-sm">
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(data.eligibility).map(
                    ([name, data]: [string, any], i: number) => (
                      <div key={i}>
                        <h2 className="mb-2 text-lg font-bold">{name}</h2>
                        <ul className="list gap-2 *:text-lg *:font-normal">
                          {data.map((subjectData: string, i: number) => (
                            <li key={i}>- {subjectData}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="grid grid-cols-1 gap-4">
            <div className="collapse-arrow collapse border border-black/15 bg-gradient-to-r from-neutral-100 from-60% to-blue-50 transition duration-300 hover:scale-101 hover:from-blue-50">
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                <h1 className="text-2xl font-bold">Curriculum</h1>
              </div>
              <div className="collapse-content text-justify text-lg font-normal">
                {data.curriculum}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
