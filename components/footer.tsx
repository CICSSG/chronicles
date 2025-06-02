'use client'
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname()

  return (
    <>
      <div className={`w-full flex flex-col justify-around gap-12 overflow-hidden rounded-2xl bg-linear-to-br from-neutral-100 via-neutral-100 via-70% to-blue-200 p-8 py-12 text-2xl border border-neutral-400 ${pathname == '/' ? 'max-w-full xl:max-w-10/12 2xl:max-w-full m-auto' : null}`}>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold text-center md:text-left">[Chronicles]</h1>
          <div className="text-center md:text-left">
            <h2 className="text-xl">Address</h2>
            <h3 className="text-lg font-medium">
              PCH 102, Paolo Campus Hall, DBB-B, 4115 West Ave, Dasmariñas,
              Cavite
            </h3>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl">Email us at:</h2>
            <h3 className="text-lg font-medium underline">
              cicssg@dlsud.edu.ph
            </h3>
          </div>
          <div className="flex flex-row gap-4 justify-center md:justify-start">
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

        <div className="flex flex-col-reverse md:flex-row gap-4 justify-between text-sm font-normal">
          <div className="text-center md:text-left">@2025 CICSSG. All rights reserved.</div>
          {/* <div className="flex flex-col md:flex-row items-center gap-4 *:underline">
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
            <a href="">Cookies Settings</a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
