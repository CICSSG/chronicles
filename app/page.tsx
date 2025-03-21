import Image from "next/image";

export default async function Home() {

  const bgImage = <Image
    src="/images/HeroBG.jpg"
    width={6016}
    height={2337}
    alt="Picture of the author"
  />
  return (
    <>
      <div className="hero">
        <div className="hero-overlay">{bgImage}</div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">[Chronicles]</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
