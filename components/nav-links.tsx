'use client'
import React from 'react'
import { Button } from "./ui/button";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      <div className="">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 py-0">
            <Button asChild size="sm" variant={pathname == "/" ? "secondary" : "ghost"}>
              <Link href="/">Home</Link>
            </Button>
            <Button asChild size="sm" variant={pathname == "/cics" ? "secondary" : "ghost"}>
              <Link href="/cics">The CICS</Link>
            </Button>
            <Button asChild size="sm" variant={pathname == "/student-government" ? "secondary" : "ghost"}>
              <Link href="/student-government">Student Government</Link>
            </Button>
            <Button asChild size="sm" variant={pathname == "/announcements" ? "secondary" : "ghost"}>
              <Link href="/announcements">Announcements</Link>
            </Button>
            <li>
              <details>
                <summary className='textarea-md p-2 font-medium'>Documents</summary>
                <ul className="bg-base-100 rounded-t-none">
                  <li>
                  <Button asChild size="sm" variant={pathname == "/documents/executive-orders" ? "secondary" : "ghost"}>
                    <Link href="/documents/executive-orders">Executive Orders</Link>
                  </Button>
                  </li>
                  <li>
                  <Button asChild size="sm" variant={pathname == "/documents/resolutions" ? "secondary" : "ghost"}>
                    <Link href="/documents/resolutions">Resolutions</Link>
                  </Button>
                  </li>
                  <li>
                  <Button asChild size="sm" variant={pathname == "/documents/transparency-reports" ? "secondary" : "ghost"}>
                    <Link href="/documents/transparency-reports">Transparency Reports</Link>
                  </Button>
                  </li>
                  <li>
                  <Button asChild size="sm" variant={pathname == "/documents/ordinances" ? "secondary" : "ghost"}>
                    <Link href="/documents/ordinances">Ordinances</Link>
                  </Button>
                  </li>
                  <li>
                  <Button asChild size="sm" variant={pathname == "/documents/formal-documents" ? "secondary" : "ghost"}>
                    <Link href="/documents/formal-documents">Formal Documents</Link>
                  </Button>
                  </li>
                  <li>
                  <Button asChild size="sm" variant={pathname == "/documents/expenses" ? "secondary" : "ghost"}>
                    <Link href="/documents/expenses">Expenses</Link>
                  </Button>
                  </li>
                </ul>
              </details>
            </li>

            <Button asChild size="sm" variant={pathname == "/events" ? "secondary" : "ghost"}>
              <Link href="/events">Events</Link>
            </Button>
          </ul>
        </div>
      </div>
      {/* <Button asChild size="sm" variant={pathname == "/" ? "secondary" : "ghost"}>
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
      </Button> */}
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