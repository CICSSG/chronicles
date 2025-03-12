import Image from "next/image";

export default async function Home() {

  const bgImage = <Image
    src="/images/CICSSG-White-Full.png"
    width={280}
    height={80}
    alt="Picture of the author"
  />
  return (
    <>
      <div>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
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
