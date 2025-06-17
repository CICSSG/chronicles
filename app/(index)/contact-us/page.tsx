'use client'
import { sendEmail } from "@/utils/send-email";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useForm } from 'react-hook-form';

const CONCERN_CHARACTERS_MAX = 500

export type FormData = {
  name: string,
  email: string,
  phone?: string,
  gender?: string,
  person: string,
  concern: string,
  message: string
};

const ContactUs = () => {
  const [character, setCharacter] = useState(0)
  const {register, handleSubmit} = useForm<FormData>()

  function onSubmit(data: FormData){
    sendEmail(data)
  }
  return (
    <div className="*w-full flex flex-col gap-4 text-black/80 *:rounded-2xl *:bg-neutral-100">
      <p className="px-10 py-10 text-4xl bg-neutral-100 rounded-2xl">Contact Us</p>

      <div className="flex flex-col xl:flex-row gap-30 px-8 xl:px-12 2xl:px-24 py-8 2xl:py-30 bg-neutral-100 rounded-2xl">
        {/* Lets Connect */}
        <div className="flex grow basis-0 flex-col gap-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Let's connect!</h1>
          <img
            src="https://placehold.co/600x400"
            alt=""
            className="rounded-xl"
          />

          <div className="mt-4 relative h-65 2xs:h-60 md:h-60 lg:h-80 mx-auto md:mx-0">
            <h2 className="text-2xl sm:3xl text-center w-fit lg:text-4xl font-medium text-black/60 md:-rotate-12 md:text-left">You can <span className="text-black/90">contact <br className="hidden md:block"/> us</span> <br className="md:hidden"/>through <br className="hidden md:block"/> the following</h2>
            <Image 
              src={"/images/contactusarrow.png"}
              alt=""
              width={300}
              height={300}
              className="absolute animate-wiggle animate-infinite animate-duration-[2000ms] animate-delay-1000 animate-ease-in-out scale-70 md:top-4 md:left-55 md:scale-80 lg:top-8 lg:left-65 lg:scale-90"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-neutral-500 text-lg font-light *:bg-white *:border-2 *:border-neutral-300 *:rounded-lg *:px-4 *:py-20 *:shadow-lg *:flex *:flex-col *:lg:flex-row *:xl:flex-col *:2xl:flex-row *:items-center *:gap-1 *:justify-center *:text-md *:sm:text-lg">
            <div className="flex flex-col bg-white px-4 py-20 items-center justify-center rounded-lg"><EnvelopeIcon className="size-6"/> cicssg@dlsud.edu.ph</div>
            <div className="flex flex-col bg-white px-4 py-20 items-center justify-center rounded-lg"><FaFacebook className="size-6"/>@DLSUD.CICSSG</div>
            <div className="flex flex-col bg-white px-4 py-20 items-center justify-center rounded-lg"><FaInstagram className="size-6"/>@dlsud.cicssg</div>
            <div className="flex flex-col bg-white px-4 py-20 items-center justify-center rounded-lg"><MapPinIcon className="size-6"/>PCH 102, DLSU-D</div>
          </div>
        </div>

        {/* Form */}
        <div className="flex grow basis-0 flex-col gap-4">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Complete the form below to take the first step!
          </p>
          <p className="text-xl font-medium">
            Tell us about yourself and your concern, and we will get back to you
            with an answer or solution.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-stretch gap-6 text-xl text-md/4 sm:text-lg/5 lg:text-xl/6">
            <div>
              <label
                htmlFor="name"
                className="block text-md/4 sm:text-lg/5 lg:text-xl/6 font-medium text-gray-900"
              >
                Name <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="name"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    className="block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none text-md/4 sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register('name', { required: true })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xl/6 font-medium text-gray-900"
              >
                Email <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="email"
                    type="email"
                    placeholder="juandelacruz@gmail.com"
                    className="block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none text-md/4 sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register('email', { required: true })}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-row">
                <label
                  htmlFor="phone"
                  className="block w-full text-xl/6 font-medium text-gray-900"
                >
                  Phone
                </label>
                <span className="ml-auto text-black/40 text-sm">Optional</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="phone"
                    type=""
                    placeholder="09xxxxxxxxx"
                    className="block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none text-md/4 sm:text-lg/5 lg:text-xl/6"
                    {...register('phone', { required: false })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 *:grow *:basis-0">
              <div>
                <div className="flex flex-row">
                  <label
                    htmlFor="gender"
                    className="block w-full text-xl/6 font-medium text-gray-900"
                  >
                    Mx.
                  </label>
                  <span className="ml-auto text-black/40 leading-6 text-sm">Optional</span>
                </div>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="gender"
                    defaultValue=""
                    className="focus:blue-300 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 text-md/4 sm:text-lg/5 lg:text-xl/6"
                    {...register('gender', { required: false })}
                  >
                    <option value=""></option>
                    <option value="mr">Mr.</option>
                    <option value="ms">Ms.</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-5"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="person"
                  className="block w-full text-xl/6 font-medium text-gray-900"
                >
                  Type of Person <span className="text-red-700">*</span>
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="person"
                    defaultValue=""
                    className="focus:blue-300 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 text-md/4 sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register('person', { required: true })}
                  >
                    <option value=""></option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-5"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="concern"
                className="block w-full text-xl/6 font-medium text-gray-900"
              >
                Type of Concern <span className="text-red-700">*</span>
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="concern"
                  defaultValue=""
                  className="focus:blue-300 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 text-md/4 sm:text-lg/5 lg:text-xl/6"
                  required
                  {...register('concern', { required: true })}
                >
                  <option value=""></option>
                  <option value="enrollment">Enrollment</option>
                  <option value=""></option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-5"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-row">
                  <label
                htmlFor="message"
                className="block text-xl/6 font-medium text-gray-900"
              >
                How can we help you? <span className="text-red-700">*</span>
              </label>
                  <span className="ml-auto text-black/40 text-sm">Max {CONCERN_CHARACTERS_MAX} characters</span>
                </div>
              
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <textarea
                    id="message"
                    maxLength={CONCERN_CHARACTERS_MAX}
                    rows={15}
                    onKeyUp={e => setCharacter((e.target as HTMLTextAreaElement).value.length)}
                    placeholder="Tell us about your concern..."
                    className="block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none text-md/4 sm:text-lg/5 lg:text-xl/6"
                    required
                    {
                      ...register('message', { 
                      required: true,
                    })}
                    
                  />
                </div>
              </div>
              <span className={`text-black/40 text-sm ${character == 0 ? 'hidden': null}`}>{CONCERN_CHARACTERS_MAX - character} characters left</span>
            </div>

            <button type="submit" className="py-3 rounded-full bg-neutral-900 text-xl text-white font-semibold bg-[url(/images/noise.png)] hover:cursor-pointer hover:bg-neutral-950 hover:scale-105">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
