import { Geist, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import Announcement from "@/components/header-announcement";
import Footer from "@/components/footer";
import NavLinks from "@/components/nav-links";
import { House } from "lucide-react";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chronicles",
  description: "The archival website for the College of Information and Computer Studies Student Government (CICSSG)",
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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !user ? (
    <html lang="en" data-theme="cicssg" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col justify-between">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            {/* <div className="navbar bg-neutral text-neutral-content w-full sticky top-0 z-999">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">
                <div className="flex gap-5 items-center text-lg font-semibold">
                  <Image
                    src="/images/CICSSG.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"/>
                  <Link href={"/"}>Chronicles</Link>
                </div>
              </div>
              <div className="hidden flex-none lg:block h-10">
                <NavLinks />
              </div>
            </div> */}
            {/* Page content here */}
            <div className="flex flex-col flex-grow items-center gap-5 w-full">
              {children}
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <NavLinks />
            </ul>
          </div>
        </div>
        {/* <div className="">
          <Footer />
        </div> */}
      </body>
    </html>
  ) : (
    <html lang="en" data-theme="light" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
