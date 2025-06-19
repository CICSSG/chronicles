"use client";
import NavCICSSG from "@/components/nav-cicssg";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname.match("cicssg/slate/")) {
    return <>{children}</>;
  }
  return (
    <div className="flex w-full flex-col gap-4 *:rounded-2xl md:flex-row">
      <div className="sticky flex grow-1 basis-0 flex-col gap-4 text-black/60 *:rounded-2xl *:bg-neutral-300 *:px-6 *:py-8 *:shadow-xl">
        <div className="rounded-2xl bg-neutral-300 bg-[url(/images/noise.png)] px-6 py-8">
          <h2 className="text-4xl font-bold">
            The <br />
            CICSSG
          </h2>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl bg-neutral-300 bg-[url(/images/noise.png)] px-6 py-8 text-lg *:font-bold">
          <NavCICSSG />
        </div>
      </div>
      <div className="flex grow-3 basis-0 flex-col gap-4 rounded-2xl bg-neutral-300 bg-[url(/images/noise.png)] p-6 text-black/80">
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
