import { SpeedInsights } from "@vercel/speed-insights/next"
import { Space_Grotesk } from "next/font/google";
import "/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";

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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-theme="cicssg"
        className={geistSans.className}
        suppressHydrationWarning
      >
        <body className="w-full min-h-screen h-full m-auto flex flex-col bg-radial from-neutral-800 to-neutral-950">
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
