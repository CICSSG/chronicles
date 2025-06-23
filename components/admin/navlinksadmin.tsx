import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

import { RiContactsBook2Line, RiDashboardLine } from "react-icons/ri";
import { FiLogOut, FiUser } from "react-icons/fi";
import { IoDocuments } from "react-icons/io5";
import { GiPoliceOfficerHead, GiTeacher } from "react-icons/gi";
import { PiUsersFill } from "react-icons/pi";
import { CalendarDaysIcon, MegaphoneIcon } from "@heroicons/react/20/solid";
import { BuildingIcon } from "lucide-react";

async function NavLinksAdmin() {
  const user = await currentUser();
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <ul className="group transition-[width, padding] flex h-screen w-15 flex-col items-center gap-3 overflow-hidden bg-gradient-to-b from-neutral-700 to-neutral-800 p-2 text-white duration-500 hover:w-60 hover:items-stretch hover:gap-5 hover:p-5">
          <div className="mx-auto rounded-full">
            <img
              className="w-full max-w-20 rounded-full"
              alt="Tailwind CSS Navbar component"
              src={user?.imageUrl}
            />
          </div>
          <li className="border-b text-center opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            <a className="text-nowrap">Welcome, {user?.username}</a>
          </li>
          <li>
            <Link
              href="/admin"
              className="flex w-fit flex-nowrap items-center gap-2"
            >
              <RiDashboardLine className="w-fit text-3xl" />
              <span className="hidden group-hover:block">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/contacts"
              className="flex w-fit flex-nowrap items-center gap-2"
            >
              <RiContactsBook2Line className="w-fit text-3xl" />
              <span className="hidden group-hover:block">Contact</span>
            </Link>
          </li>
          {(user?.publicMetadata.role == "data" || user?.publicMetadata.role == "admin") && (
            <>
              <li>
                <Link
                  href="/admin/documents?page=1"
                  className="flex w-fit flex-nowrap items-center gap-2"
                >
                  <IoDocuments className="text-3xl" />
                  <span className="hidden group-hover:block">Documents</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/announcements"
                  className="flex w-fit flex-nowrap items-center gap-2"
                >
                  <MegaphoneIcon className="size-7 text-3xl" />
                  <span className="hidden group-hover:block">
                    Announcements
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/events"
                  className="flex w-fit flex-nowrap items-center gap-2"
                >
                  <CalendarDaysIcon className="size-7 text-3xl" />
                  <span className="hidden group-hover:block">Events</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/officers"
                  className="flex w-fit flex-nowrap items-center gap-2"
                >
                  <GiPoliceOfficerHead className="text-3xl" />
                  <span className="hidden group-hover:block">Slate</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/admin-staff"
                  className="flex w-fit flex-nowrap items-center gap-2"
                >
                  <BuildingIcon className="text-3xl" />
                  <span className="hidden text-nowrap group-hover:block">
                    Admin & Staff
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/faculty"
                  className="flex w-fit flex-nowrap items-center gap-2"
                >
                  <GiTeacher className="text-3xl" />
                  <span className="hidden group-hover:block">Faculty</span>
                </Link>
              </li>
            </>
          )}

          {user?.publicMetadata.role == "admin" && (
            <li>
              <Link
                href="/admin/users"
                className="flex w-fit flex-nowrap items-center gap-2"
              >
                <PiUsersFill className="text-3xl" />
                <span className="hidden group-hover:block">Users</span>
              </Link>
            </li>
          )}

          <div className="mt-auto flex flex-col flex-nowrap items-center gap-2 group-hover:items-stretch">
            <li>
              <Link
                href="/admin/profile"
                className="flex w-fit flex-nowrap items-center gap-2"
              >
                <FiUser className="text-3xl" />
                <span className="hidden group-hover:block">Profile</span>
              </Link>
            </li>
            <SignOutButton>
              <div className="flex w-fit flex-nowrap items-center gap-2 hover:cursor-pointer">
                <FiLogOut className="text-3xl" />
                <span className="hidden group-hover:block">Logout</span>
              </div>
            </SignOutButton>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default NavLinksAdmin;
