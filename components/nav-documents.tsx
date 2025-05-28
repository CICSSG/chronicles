"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDocuments() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={"/documents/executive-orders"}
        className={pathname.match("/executive-orders") ? "underline" : ""}
      >
        Executive Orders
      </Link>
      <Link
        href={"/documents/transparency-reports"}
        className={pathname.match("/transparency-reports") ? "underline" : ""}
      >
        Transparency Report
      </Link>
      <Link
        href={"/documents/ordinances"}
        className={pathname.match("/ordinances") ? "underline" : ""}
      >
        Ordinances
      </Link>
      <Link
        href={"/documents/formal-documents"}
        className={pathname.match("/formal-documents") ? "underline" : ""}
      >
        Formal Documents
      </Link>
      <Link
        href={"/documents/resolutions"}
        className={pathname.match("/resolutions") ? "underline" : ""}
      >
        Resolutions
      </Link>
    </>
  );
}
