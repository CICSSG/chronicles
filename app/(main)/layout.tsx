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
  <html
    lang="en"
    data-theme="cicssg"
    className={geistSans.className}
    suppressHydrationWarning
  >
    <body className="bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
      <SignedIn>
        <Link
          href={"/admin"}
          className="fixed right-4 bottom-4 rounded-full bg-neutral-100 p-4 hover:cursor-pointer hover:bg-neutral-200"
        >
          <Edit />
        </Link>
      </SignedIn>
      <div className="flex min-h-dvh w-dvw flex-col items-center">
        <div className="my-10 flex w-full max-w-11/12 grow flex-col items-center gap-5 xl:max-w-9/12">
          <div className="m-auto flex w-full flex-row justify-between px-10 py-2 text-xl text-black">
            <NavLinks />
          </div>

          <div className="w-full grow-1 basis-0">{children}</div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </body>
  </html>;
}
