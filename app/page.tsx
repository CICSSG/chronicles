import Image from "next/image";

export default async function Home() {

  const bgImage = <Image
    src="/images/HeroBG.jpg"
    width={1985}
    height={771}
    alt="Picture of the author"
  />
  return (
    <>
      {/* Hero Section */}
      <div className="hero place-items-end mb-10">
        <div className="hero-overlay">{bgImage}</div>
        <div className="hero-content text-neutral-50 text-center">
          <div className="max-w-md pr-3 lg:pr-20 lg:pb-5">
            <h1 className="mb-1 font-bold text-2xl sm:mb-2 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">[Chronicles]</h1>
            <p className="mb-1 text-base sm:lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              The CICSSG Archive
            </p>
          </div>
        </div>
      </div>

      {/* The CICS */}
      <div className="flex w-10/12 lg:w-8/12 mb-10">
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mr-10 md:mb-0">
            <h1 className="font-bold text-3xl mb-4">The CICS</h1>
            <p className="text-justify">The College of Information and Computer Studies (CICS) at De La Salle University - Dasmariñas (DLSU-D) us a premier institution dedicated to excellence in computing and information technology education. It offers innovative and industry-aligned programs that prepare students for dynamic careers in software development, cybersecurity, data science, and emerging fields in IT.</p>
          </div>
          <img src="https://placehold.co/400x250" alt="" className="rounded-2xl h-full object-cover md:w-2/4" />
        </div>
      </div>

      {/* The CICSSG */}
      <div className="flex w-10/12 lg:w-8/12 mb-10">
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mr-10 md:mb-0">
            <h1 className="font-bold text-3xl mb-4">The CICSSG</h1>
            <p className="text-justify">The College of Information and Computer Studies (CICS) at De La Salle University - Dasmariñas (DLSU-D) us a premier institution dedicated to excellence in computing and information technology education. It offers innovative and industry-aligned programs that prepare students for dynamic careers in software development, cybersecurity, data science, and emerging fields in IT.</p>
          </div>
          <img src="https://placehold.co/400x250" alt="" className="rounded-2xl h-full object-cover md:w-2/4" />
        </div>
      </div>
    </>
  );
}
