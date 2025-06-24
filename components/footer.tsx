"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div
      className={`flex w-full flex-col justify-between gap-12 overflow-hidden rounded-2xl border border-neutral-400 bg-white bg-linear-to-br from-neutral-100 via-neutral-100 via-70% to-blue-200 p-8 py-12 text-2xl md:flex-row m-auto max-w-full 2xl:max-w-10/12`}
    >
      <div className="flex grow basis-0 flex-col justify-around gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-center text-3xl font-extrabold md:text-left">
            [Chronicles]
          </h1>
          <div className="text-center md:text-left">
            <h6 className="text-xl">Address</h6>
            <h6 className="text-lg font-normal">
              PCH 102, Paolo Campus Hall, DBB-B, 4115 West Ave, Dasmariñas,
              Cavite
            </h6>
          </div>
          <div className="text-center md:text-left">
            <h6 className="text-xl">Email us at:</h6>
            <h6 className="text-lg font-normal underline"><a href="mailto:cicssg@dlsud.edu.ph">cicssg@dlsud.edu.ph</a></h6>
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

        <div className="flex flex-col justify-between gap-4 text-sm font-normal md:flex-row">
          <h6 className="text-center md:text-left">
            @2025 CICSSG. All rights reserved.
          </h6>
          <div className="flex flex-col md:flex-row items-center gap-4 *:underline">
            <h6>
              <Link
                href="https://www.dlsud.edu.ph/"
                target="_blank"
                className="hover:underline text-nowrap"
              >
                DLSU-D Website
              </Link>
            </h6>
            <h6>
              <Link
                href="https://portal.dlsud.edu.ph/mydlsud/"
                target="_blank"
                className="hover:underline text-nowrap"
              >
                DLSU-D Portal
              </Link>
            </h6>
            <h6>
              <Link
                href="https://dlsud.edu20.org/"
                target="_blank"
                className="hover:underline text-nowrap"
              >
                Schoolbook
              </Link>
            </h6>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;
