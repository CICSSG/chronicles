import Image from "next/image";

export default function CICSSG() {
  return (
    <div className="grid grid-cols-1 gap-4 *:rounded-xl *:bg-white/80 *:p-8">
      <div className="flex flex-col gap-10 text-justify">
        <Image
          src="/images/DLSUD-rotonda.jpg"
          width={1000}
          height={500}
          alt=""
          className="h-96 w-full rounded-xl border-2 border-black/40 object-cover shadow-lg"
        />
        <h1 className="text-3xl">About CICSSG</h1>
        <p className="text-xl font-normal">
          The College of Information and Computer Studies Student Government
          (CICSSG) is the highest governing student body of the College of
          Information and Computer Studies (CICS) of De La Salle University –
          Dasmariñas (DLSU-D). It exists to serve the college of the pioneers,
          leading innovation and pioneering excellence. It aims to forge new
          paths, set new standards, and build a legacy of excellence with every
          step forward.
        </p>
        <hr />
        <div className="grid grid-cols-1 justify-around gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-3xl">Mission</h1>
            <p className="text-xl font-normal">
              To lead innovations and pioneer excellence in serving the student
              body of the College of Information and Computer Studies through a
              responsive and student-centered leadership.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-3xl">Vision</h1>
            <p className="text-xl font-normal">
              A technologically-advanced and data-driven student government that
              pioneers innovations for the improvement of the Lasallian
              Community.
            </p>
          </div>
        </div>

        <hr />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Emblem</h1>
          <div className="flex flex-col xl:flex-row gap-8">
            <Image
              src={"/images/CICSSG.png"}
              alt=""
              width={300}
              height={300}
              className="border-2 border-black rounded-xl aspect-square object-contain mx-auto"
            />
            <div>
              <ul className="list h-full list-inside list-disc justify-between py-2 text-xl font-normal">
                <li className="font-bold">
                  Silver and White
                  <ul className="list ml-8 list-inside list-disc text-xl font-normal">
                    <li>
                      These colors embody our commitment to innovation and
                      excellence, blending clarity with progress.
                    </li>
                  </ul>
                </li>

                <li className="font-bold">
                  Panther
                  <ul className="list ml-8 list-inside list-disc text-xl font-normal">
                    <li>
                      It symbolizes strength and power, along with intuition and
                      insight that are known traits of a panther.
                    </li>
                  </ul>
                </li>

                <li className="font-bold">
                  Central Processing Unit (CPU)
                  <ul className="list ml-8 list-inside list-disc text-xl font-normal">
                    <li>
                      Being the brain of the computer, it symbolizes
                      intelligence and innovation, befitting the college’s
                      nature.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
