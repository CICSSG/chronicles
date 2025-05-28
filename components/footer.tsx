import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-around gap-12 overflow-hidden rounded-2xl bg-neutral-100 p-8 py-12 text-2xl border border-neutral-400">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-extrabold">[Chronicles]</h1>
          <div>
            <h2 className="text-xl">Address</h2>
            <h3 className="text-lg font-medium">
              PCH 102, Paolo Campus Hall, DBB-B, 4115 West Ave, Dasmariñas,
              Cavite
            </h3>
          </div>
          <div>
            <h2 className="text-xl">Email us at:</h2>
            <h3 className="text-lg font-medium underline">
              cicssg@dlsud.edu.ph
            </h3>
          </div>
          <div className="flex flex-row gap-4">
            <a href="">
              <FaFacebook />
            </a>
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="flex flex-row justify-between text-sm font-normal">
          <div>@2025 CICSSG. All rights reserved.</div>
          <div className="flex flex-row gap-4 *:underline">
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
            <a href="">Cookies Settings</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
