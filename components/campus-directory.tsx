"use client";
import { eastCampus } from "@/app/(index)/cics/blueprint/page";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CampusDirectory() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-2 gap-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-80">
          East Campus
        </li>

        {eastCampus.map((data, i) => (
          <li className="list-row" key={i}>
            <div className="text-4xl font-light tabular-nums opacity-30">
              {String(data.number).padStart(2, "0")}
            </div>
            <div className="my-auto">{data.name}</div>
            <a
              className="btn btn-square btn-ghost"
              href={"/cics/blueprint/" + data.id}
            >
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs tracking-wide opacity-80">
          West Campus
        </li>
        {Array.from({ length: 5 }).map((_, i) => (
          <li className="list-row" key={i}>
            <div className="text-4xl font-light tabular-nums opacity-30">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="my-auto">Gregoria Montoya Hall</div>
            <a
              className="btn btn-square btn-ghost"
              href="/cics/blueprint"
              target="_blank"
            >
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
