"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  { href: "/executive-orders", text: "Executive Orders" },
  { href: "/transparency-reports", text: "Transparency Reports" },
  { href: "/ordinances", text: "Ordinances" },
  { href: "/formal-documents", text: "Formal Documents" },
  { href: "/resolutions", text: "Resolutions" },
];

export default function NavDocuments() {
  const pathname = usePathname();

  return (
    <>
      {paths.map((item, i) => (
        <Link
        key={i}
          href={"/documents" + item.href}
          className={
            pathname.match(item.href)
              ? "text-black underline"
              : "hover:text-black/75"
          }
        >
          {item.text}
        </Link>
      ))}
    </>
  );
}
