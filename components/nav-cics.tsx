"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  { href: "/programs", text: "Programs" },
  { href: "/departments", text: "Departments" },
  { href: "/student-organization", text: "Student Organization" },
  { href: "/admin-staff", text: "Admin & Staff" },
  { href: "/faculty", text: "Faculty" },
];
export default function NavCICS() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={"/cics"}
        className={pathname.endsWith("/cics") ? "text-black underline" : "hover:text-black/75"}
      >
        About
      </Link>

      {paths.map((item, i) => (
        <Link
        key={i}
          href={"/cics" + item.href}
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
