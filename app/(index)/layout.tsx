import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';

import { Space_Grotesk, Inter } from "next/font/google";
import Link from "next/link";
import "/app/globals.css";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";
import { Edit } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chronicles",
  description:
    "The archival website for the College of Information and Computer Studies Student Government (CICSSG)",
};

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="cicssg"
      className={`${spaceGrotesk.className} ${inter.className}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col justify-between overflow-x-hidden">
        <SignedIn>
          <Link href={"/admin"} className="fixed bottom-4 right-4 bg-neutral-100 p-4 rounded-full hover:bg-neutral-200 hover:cursor-pointer z-20"><Edit/></Link>
        </SignedIn>
        {/* TODO ANNOUNCEMENTS */}
        {/* <div className="flex flex-row justify-center gap-2 w-full px-3 py-3 text-xl font-bold">
          <h1>ANNOUCNEMTN</h1>
          <div>asd</div>
        </div> */}
        
        <div className="flex w-full flex-col items-center gap-5">
          <div className="font-space flex min-h-dvh min-w-dvw flex-col items-center bg-neutral-800 font-semibold">
            <div className="my-10 flex max-w-11/12 flex-col gap-5 xl:max-w-10/12 3xl:max-w-[1920px] lg:px-10 w-full h-full">
              <div className="flex w-full flex-row justify-between 2xl:px-8 py-2 text-xl text-white">
                <NavLinks />
              </div>

              <div className="grow-1 basis-0">
                <Suspense><NuqsAdapter>{children}</NuqsAdapter></Suspense>
                <SpeedInsights />
                <Analytics />
              </div>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
