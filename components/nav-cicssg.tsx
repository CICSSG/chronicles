"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  { href: "/slate", text: "Slate" },
];
export default function NavCICSSG() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={"/cicssg"}
        className={pathname.endsWith("/cicssg") ? "text-black underline" : "hover:text-black/75"}
      >
        About
      </Link>

      {paths.map((item, i) => (
        <Link
        key={i}
          href={"/cicssg" + item.href}
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
