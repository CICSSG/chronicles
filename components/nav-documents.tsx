"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDocuments() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={"/documents/executive-orders"}
        className={pathname.match("/executive-orders") ? "underline text-black" : ""}
      >
        Executive Orders
      </Link>
      <Link
        href={"/documents/transparency-reports"}
        className={pathname.match("/transparency-reports") ? "underline text-black" : ""}
      >
        Transparency Report
      </Link>
      <Link
        href={"/documents/ordinances"}
        className={pathname.match("/ordinances") ? "underline text-black" : ""}
      >
        Ordinances
      </Link>
      <Link
        href={"/documents/formal-documents"}
        className={pathname.match("/formal-documents") ? "underline text-black" : ""}
      >
        Formal Documents
      </Link>
      <Link
        href={"/documents/resolutions"}
        className={pathname.match("/resolutions") ? "underline text-black" : ""}
      >
        Resolutions
      </Link>
    </>
  );
}
