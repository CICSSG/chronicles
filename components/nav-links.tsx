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
        <Link href="/faculty">Faculty</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/officers" ? "secondary" : "ghost"}>
        <Link href="/officers">Officers</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/events" ? "secondary" : "ghost"}>
        <Link href="/events">Events</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/documents" ? "secondary" : "ghost"}>
        <Link href="/documents">Documents</Link>
      </Button>
      <Button asChild size="sm" variant={pathname == "/about" ? "secondary" : "ghost"}>
        <Link href="/about">About</Link>
      </Button>
      {/* <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button> */}
    </>
  )
}