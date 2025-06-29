import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { Space_Grotesk, Inter, Roboto } from "next/font/google";
import Link from "next/link";
import "/app/globals.css";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";
import { Edit } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import UrgentAnnouncement from "@/components/urgent-announcement";

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

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
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
          <Link
            href={"/admin"}
            className="fixed right-4 bottom-4 z-20 rounded-full bg-neutral-100 p-4 hover:cursor-pointer hover:bg-neutral-200"
          >
            <Edit />
          </Link>
        </SignedIn>

        <div className="flex w-full flex-col items-center gap-5 ">
          <div className="font-space flex min-h-dvh min-w-dvw flex-col items-center bg-neutral-800 font-semibold">
            <UrgentAnnouncement />
            <div className="3xl:max-w-[1920px] my-10 flex h-full w-full max-w-11/12 flex-col gap-5 lg:px-10 xl:max-w-10/12 items-center">
              <div className="flex w-full flex-row justify-between py-2 text-xl text-white 2xl:px-8 2xl:max-w-10/12">
                <NavLinks />
              </div>

              <div className="grow-1 basis-0 w-full 2xl:max-w-10/12">
                <Suspense>
                  <NuqsAdapter>{children}</NuqsAdapter>
                </Suspense>
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
  );
}
