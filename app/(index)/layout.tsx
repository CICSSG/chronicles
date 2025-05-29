import { Geist, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "/app/globals.css";
import { createClient } from "@/utils/supabase/server";
import Announcement from "@/components/header-announcement";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";
import { Edit, House } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chronicles",
  description:
    "The archival website for the College of Information and Computer Studies Student Government (CICSSG)",
};

const geistSans = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
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
      className={geistSans.className}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col justify-between overflow-x-hidden">
        <SignedIn>
          <Link href={"/admin"} className="fixed bottom-4 right-4 bg-neutral-100 p-4 rounded-full hover:bg-neutral-200 hover:cursor-pointer z-20"><Edit/></Link>
        </SignedIn>
        <div className="flex w-full flex-col items-center gap-5">
          <div className="font-space flex min-h-dvh min-w-dvw flex-col items-center bg-neutral-800 font-semibold">
            <div className="my-10 flex max-w-11/12 flex-col gap-5 xl:max-w-[1920px] px-10 w-full h-full">
              <div className="flex w-full flex-row justify-between lg:px-8 py-2 text-xl text-white">
                <NavLinks />
              </div>

              <div className="grow-1 basis-0">
                {children}
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
