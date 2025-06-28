'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  DocumentArrowUpIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  PresentationChartLineIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'

const documents = [
  { name: 'Executive Orders', description: 'Executive Orders made by CICSSG', href: '/documents/executive-orders', icon: DocumentTextIcon },
  { name: 'Transparency Reports', description: 'Transparency Reports made by CICSSG', href: '/documents/transparency-reports', icon: DocumentArrowUpIcon },
  { name: 'Ordinances', description: 'Ordinances made by CICSSG', href: '/documents/ordinances', icon: DocumentTextIcon },
  { name: 'Formal Documents', description: 'Formal Documents made by CICSSG', href: '/documents/formal-documents', icon: DocumentCheckIcon },
  { name: 'Resolutions', description: 'Resolutions made by CICSSG', href: '/documents/resolutions', icon: DocumentChartBarIcon },
]

const cics = [
  { name: 'About', description: 'More information about CICS', href: '/cics', icon: InformationCircleIcon },
  { name: 'Programs', description: 'View available programs in CICS', href: '/cics/programs', icon: ComputerDesktopIcon },
  { name: 'Departments', description: 'Current departments of CICS', href: '/cics/departments', icon: AcademicCapIcon },
  { name: 'Student Organization', description: 'About the Student Organization', href: '/cics/student-organization', icon: BriefcaseIcon },
  { name: 'Admin & Staff', description: 'Current admin and staff of CICS', href: '/cics/admin-staff', icon: BuildingOfficeIcon },
  { name: 'Faculty', description: 'Current faculty members of CICS', href: '/cics/faculty', icon: PresentationChartLineIcon },
]

const cicssg = [
  { name: 'About', description: 'More information about CICSSG', href: '/cicssg', icon: InformationCircleIcon },
  { name: 'Slate', description: 'Current officers of CICSSG', href: '/cicssg/slate', icon: ListBulletIcon },
]

export default function NavLinks() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      <nav aria-label="Global" className="mx-auto flex items-center justify-between lg:p-6 lg:px-4">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <Image 
              src={"/images/LOGO.png"}
              alt=''
              width={200}
              height={50}
            />
          </a>
        </div>
        <div className="flex xl:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden xl:flex lg:gap-x-6 ">
          <Link href={"/"} className="text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6 mr-2">
            Home
          </Link>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6 hover:cursor-pointer">
              CICS
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {cics.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6 hover:cursor-pointer">
              CICSSG
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {cicssg.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <Link href={"/announcements"} className="text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6">
            Announcements
          </Link>

          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6 hover:cursor-pointer">
              Documents
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {documents.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link href={"/events"} className="text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6">
            Events
          </Link>
          <Link href={"/contact-us"} className="text-sm/6 font-semibold lg:text-md/6 xl:text-xl/6">
            Contact Us
          </Link>
        </PopoverGroup>

      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="xl:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="">[Chronicles]</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>

                <Disclosure as="div" className="-mx-6">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 mx-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    CICS
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180 mx-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2 bg-gray-100 inset-shadow-sm inset-shadow-black/10">
                    {[...cics].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-10 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="-mx-6">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 mx-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    CICSSG
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180 mx-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2 bg-gray-100 inset-shadow-sm inset-shadow-black/10">
                    {[...cicssg].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-10 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="/announcements"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Announcements
                </a>
                
                <Disclosure as="div" className="-mx-6">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 mx-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Documents
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180 mx-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2 bg-gray-100 inset-shadow-sm inset-shadow-black/10">
                    {[...documents].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-10 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <a
                  href="/events"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Events
                </a>
                <a
                  href="/contact-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </a>
              </div>

            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
