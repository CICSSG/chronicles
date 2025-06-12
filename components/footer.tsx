"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div
      className={`flex w-full flex-col md:flex-row justify-between gap-12 overflow-hidden rounded-2xl border border-neutral-400 bg-linear-to-br from-neutral-100 via-neutral-100 via-70% to-blue-200 p-8 py-12 text-2xl ${pathname == "/" ? "m-auto max-w-full xl:max-w-10/12" : null}`}
    >
      <div className="flex grow basis-0 flex-col justify-around gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-3xl font-extrabold md:text-left">
            [Chronicles]
          </h1>
          <div className="text-center md:text-left">
            <p className="text-xl">Address</p>
            <p className="text-lg font-medium">
              PCH 102, Paolo Campus Hall, DBB-B, 4115 West Ave, Dasmariñas,
              Cavite
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xl">Email us at:</p>
            <p className="text-lg font-medium underline">cicssg@dlsud.edu.ph</p>
          </div>
          <div className="flex flex-row justify-center gap-4 md:justify-start">
            <a href="https://www.facebook.com/DLSUD.CICSSG" target="_blank">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/dlsud.cicssg/" target="_blank">
              <FaInstagram />
            </a>
            {/* <a href="">
              <FaLinkedin />
            </a> */}
          </div>
        </div>

        <div className="flex flex-col-reverse justify-between gap-4 text-sm font-normal md:flex-row">
          <div className="text-center md:text-left">
            @2025 CICSSG. All rights reserved.
          </div>
          {/* <div className="flex flex-col md:flex-row items-center gap-4 *:underline">
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
            <a href="">Cookies Settings</a>
          </div> */}
        </div>
      </div>

      <div className="flex grow basis-0 flex-row justify-around items-center">
        <div className="flex flex-col gap-4 *:text-center">
          <h2 className="text-2xl font-bold">Quick Links</h2>
          <div className="flex flex-col gap-2 *:text-lg *: font-light">
            <Link
              href="https://www.dlsud.edu.ph/"
              target="_blank"
              className="hover:underline"
            >
              DLSU-D Website
            </Link>
            <Link
              href="https://portal.dlsud.edu.ph/mydlsud/"
              target="_blank"
              className="hover:underline"
            >
              DLSU-D Portal
            </Link>
            <Link
              href="https://dlsud.edu20.org/"
              target="_blank"
              className="hover:underline"
            >
              Schoolbook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
