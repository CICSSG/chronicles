import { SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

import {
  RiDashboardLine,
} from "react-icons/ri";
import { FiLogOut, FiUser } from "react-icons/fi";
import { IoDocuments } from "react-icons/io5";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { PiUsersFill } from "react-icons/pi";

async function NavLinksAdmin() {
  const user = await currentUser()
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <ul className="group flex flex-col items-center h-screen p-2 gap-5 bg-gradient-to-b from-neutral-700 to-neutral-800 text-white transition-[width, padding] duration-500 overflow-hidden w-15 hover:w-60 hover:p-5 hover:items-stretch hover:gap-5">
          <div className="rounded-full mx-auto">
            <img
              className="rounded-full w-full max-w-20"
              alt="Tailwind CSS Navbar component"
              src={user?.imageUrl} />
          </div>
          <li className='border-b text-center transition-opacity opacity-0 group-hover:opacity-100 group-hover:block'><a className='text-nowrap'>Welcome, {user?.username}</a></li>
          <li>
            <Link href="/admin" className='flex items-center flex-nowrap gap-2 w-fit'>
              <RiDashboardLine className='text-3xl w-fit' />
              <span className='hidden group-hover:block'>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/documents?page=1" className='flex items-center flex-nowrap gap-2 w-fit'>
              <IoDocuments className='text-3xl' />
              <span className='hidden group-hover:block'>Documents</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/officers" className='flex items-center flex-nowrap gap-2 w-fit'>
              <GiPoliceOfficerHead className='text-3xl' />
              <span className='hidden group-hover:block'>Slate</span>
            </Link>
          </li>
          
          <li>
            <Link href="/admin/users" className='flex items-center flex-nowrap gap-2 w-fit'>
              <PiUsersFill className='text-3xl' />
              <span className='hidden group-hover:block'>Users</span>
            </Link>
          </li>
          <div className='mt-auto flex flex-col flex-nowrap gap-2 items-center group-hover:items-stretch'>
            <li>
              <Link href="/admin/profile" className='flex items-center flex-nowrap gap-2 w-fit'>
                <FiUser className='text-3xl' />
                <span className='hidden group-hover:block'>Profile</span>
              </Link>
            </li>
            <SignOutButton>
              <div className='flex items-center flex-nowrap gap-2 w-fit hover:cursor-pointer'>
                <FiLogOut className='text-3xl' />
                <span className='hidden group-hover:block'>Logout</span>
              </div>
            </SignOutButton>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default NavLinksAdmin