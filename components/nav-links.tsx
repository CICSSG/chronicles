'use client'
import React from 'react'
import { Button } from "./ui/button";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      <Button asChild size="sm" variant={pathname == "/" ? "secondary" : "ghost"}>
        <Link href="/">Home</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/faculty" ? "secondary" : "ghost"}>
        <Link href="/faculty">The CICS</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/officers" ? "secondary" : "ghost"}>
        <Link href="/officers">Student Government</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/announcements" ? "secondary" : "ghost"}>
        <Link href="/announcements">Announcements</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/documents" ? "secondary" : "ghost"}>
        <Link href="/documents">Documents</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/events" ? "secondary" : "ghost"}>
        <Link href="/events">Events</Link>
      </Button>
      {/* <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Documents</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a>Executive Orders</a></li>
                  <li><a>Resolutions</a></li>
                  <li><a>Transparecy Reports</a></li>
                  <li><a>Ordinances</a></li>
                  <li><a>Formal Documents</a></li>
                  <li><a>Expenses</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div> */}
      {/* <Button asChild size="sm" variant={pathname == "/about" ? "secondary" : "ghost"}>
        <Link href="/about">About</Link>
      </Button> */}
      {/* <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button> */}
    </>
  )
}