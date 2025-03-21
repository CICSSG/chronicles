import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import Announcement from "@/components/header-announcement";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chronicles",
  description: "The archival website for the College of Information and Computer Studies Student Government (CICSSG)",
};

const geistSans = Geist({
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
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Announcement />
          <div className="flex-1 w-full flex flex-col gap-5 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center text-lg font-semibold">
                  <Image
                    src="/images/CICSSG.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"

                  />
                  <Link href={"/"}>Chronicles</Link>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>
            
            <div className="flex flex-col flex-grow items-center gap-5 w-full p-2">
              {children}
            </div>

            <Footer />
          </div>
        </main>
      </body>
    </html>
  ) : (
    <html lang="en" data-theme="light" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-row">
          <div className="flex-1 w-full flex flex-row gap-5 items-center">
            <nav className="h-screen flex-col flex justify-center border-r border-r-foreground/10 bg-neutral top-0 fixed z-1">
              <div className="w-14 max-w-5xl flex flex-col justify-between items-center p-3 px-5 text-sm h-full hover:w-50 transition-[width]">
                <div className="flex flex-col gap-5 items-center text-lg font-semibold">
                  <Image
                    src="/images/CICSSG.png"
                    width={80}
                    height={400}
                    alt="Picture of the author"
                    className="w-fit h-auto"
                  />
                  <Link href={"/"}>Chronicles</Link>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>
            <div className="flex flex-col flex-grow items-center gap-5 w-full max-w-7xl p-2 ml-14">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
