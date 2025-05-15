import Image from "next/image";

export default async function Home() {

  const bgImage = <Image
    src="/images/HeroBG.jpg"
    width={1600}
    height={500}
    alt="Picture of the author"
  />
  return (
    <>
      <div className="flex flex-col items-center w-full h-full bg-neutral-800 font-spaceGrotesk font-semibold">
        <div className="flex flex-col w-10/12 my-10 gap-5">
          {/* Top */}
          <div className="flex flex-col md:flex-row grow p-5 bg-linear-to-br from-white via-white to-blue-100 rounded-2xl overflow-hidden justify-between md:p-1 md:items-center">
            <div className="bgImage rounded-2xl overflow-hidden hidden md:block">
              <img src="https://placehold.co/600/000000/FFFFFF/png" alt="" />
            </div>
            <div className="text text-right text-2xl md:text-3xl lg:text-4xl">
              <h1 className="md:mr-12">For Students, By <br className="sm:hidden"/>Students <br /> - A Legacy Of <span className="text-neutral-600">Service</span> And <br /><span className="text-neutral-600">Support.</span></h1>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex flex-col md:flex-row gap-5 text-2xl">
            {/* Left 2 Columns */}
            <div className="flex flex-col grow-2 gap-5">
              {/* Top Two */}
              <div className="h-132 flex flex-col md:flex-row gap-5">
                <div className="grow basis-0 p-5 bg-neutral-200 rounded-2xl overflow-hidden">
                  <h2>The CICS</h2>
                </div>
                <div className="grow basis-0 p-5 bg-neutral-50 rounded-2xl overflow-hidden">
                  <h2 className="md:float-end">The CICS&#123;SG&#125;</h2>
                </div>
              </div>
              {/* Bottom One */}
              <div className="h-96 p-5 bg-neutral-200 rounded-2xl overflow-hidden">
                <h2>Documents</h2>
              </div>
            </div>
            {/* Right Column 3 Rows */}
            <div className="flex flex-col grow-1 gap-5">
              <div className="grow-2 min-h-48 p-5 bg-neutral-200 rounded-2xl overflow-hidden">
                <h2>Announcements</h2>
              </div>
              <div className="grow-3 min-h-48 p-5 bg-neutral-200 rounded-2xl overflow-hidden">
                <h2>Events</h2>
              </div>
              <div className="flex flex-col grow-1/2 p-5 bg-neutral-500 text-white rounded-2xl overflow-hidden">
                <h2 className="text-end font-bold">Contact Us</h2>
                <h3 className="text-end font-normal text-base">Got concerns or suggestions? <br /> Tell us --we're listening.</h3>
                <div className="w-full text-center bg-neutral-800 rounded-xl font-normal py-1 border-1 border-white">cicssg@dlsud.edu.ph</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="h-96 p-5 bg-neutral-100 rounded-2xl overflow-hidden text-2xl">
            <h1>[Chronicles]</h1>
          </div>
        </div>
      </div>
    </>
  );
}
