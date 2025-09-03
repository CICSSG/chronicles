"use client";
import { sendAnonymousEmail, sendEmail } from "@/utils/send-email";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { set, useForm } from "react-hook-form";
import Link from "next/link";
import ShortUniqueId from "short-unique-id";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  AddAnonymousSubmission,
  GetAnonymousSubmission,
  GetAnonymousSubmissions,
} from "@/components/public-documents-data";
import { redirect } from "next/navigation";

const CONCERN_CHARACTERS_MAX = 1000;

export type FormData = {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  person: string;
  concern: string;
  message: string;
};

export interface AnonymousData {
  id: string;
  messages: {
    from: string;
    content: string;
    sent_at: string;
  }[];
  email: string | undefined;
  updated_at: string;
}

const ContactUs = () => {
  const [open, setOpen] = useState(false);
  const [character, setCharacter] = useState(0);
  const [anonymousCharacter, setAnonymousCharacter] = useState(0);
  const { register, handleSubmit } = useForm<FormData>();
  const [copyText, setCopyText] = useState("Click to copy");
  const [error, setError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState("");
  const [submissionIds, setSubmissionIds] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIds = localStorage.getItem("submissionIds");
      return storedIds ? JSON.parse(storedIds) : [];
    }
    return [];
  });
  const [submissionData, setSubmissionData] = useState<AnonymousData[]>(() => {
    if (typeof window !== "undefined") {
      const formattedIds = submissionIds.map((id: string) =>
        id.replace("Pioneer-", ""),
      );
      GetAnonymousSubmissions(formattedIds).then((data) => {
        setSubmissionData(data && data.documents ? data.documents : []);
      });
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("submissionIds", JSON.stringify(submissionIds));
    }
  }, [submissionIds]);

  const addSubmissionId = (id: string) => {
    setSubmissionIds((prevIds: string[]) => [...prevIds, id]);
  };

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  function handleSubmitAnonymous(data: {
    email?: string;
    id: string;
    type: string;
  }) {
    sendAnonymousEmail(data);
  }

  async function handleAnonymousSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const uid = new ShortUniqueId({ length: 10 });
    const uuid = uid.stamp(10);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    const formatJSON = {
      id: uuid,
      ...Object.fromEntries(formData),
      messages: [
        {
          from: "You",
          content: Object.fromEntries(formData).messages,
          sent_at: new Date().toISOString(),
        },
      ],
    };

    addSubmissionId("Pioneer-" + uuid);
    setSubmissionId("Pioneer-" + uuid);
    setOpen(true);

    const res = await AddAnonymousSubmission(formatJSON);

    if (res.success) {
      if (email && email != "") {
        handleSubmitAnonymous({
          email: email,
          id: uuid,
          type: "Received",
        });
      } else {
        handleSubmitAnonymous({
          id: uuid,
          type: "UserSend",
        });
      }
      const formattedIds = submissionIds.map((id: string) =>
        id.replace("Pioneer-", ""),
      );
      formattedIds.push(uuid);
      GetAnonymousSubmissions(formattedIds).then((data) => {
        setSubmissionData(data && data.documents ? data.documents : []);
      });
    }

    (
      document.getElementById(
        "anonymous-message-form",
      ) as HTMLFormElement | null
    )?.reset();
  }

  async function handleViewSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const uuid = formData.get("submissionId") as string;

    const res = await GetAnonymousSubmission(uuid.replace("Pioneer-", ""));
    if (res.success) {
      (
        document.getElementById(
          "view-submission-form",
        ) as HTMLFormElement | null
      )?.reset();
      addSubmissionId(uuid);
      setSubmissionId(uuid);

      redirect(`/contact-us/${uuid.replace("Pioneer-", "")}`);
    } else {
      setError("Submission ID not found. Please check and try again.");

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }

  const copylink = () => {
    navigator.clipboard.writeText(submissionId);
    setCopyText("Copied to clipboard!");

    setTimeout(() => {
      setCopyText("Click to copy");
    }, 1000);
  };

  return (
    <div className="*w-full flex flex-col gap-4 text-black/80 *:rounded-2xl">
      <h2 className="rounded-2xl bg-neutral-100 bg-linear-to-r from-black/2 via-black/2 via-70% to-black/20 px-10 py-8 text-4xl">
        Contact Us - Sulong Pioneers Platform
      </h2>

      <section
        id="identified"
        className="flex flex-col gap-30 rounded-2xl bg-neutral-100 px-8 py-8 xl:flex-row xl:px-12 2xl:px-24 2xl:py-30"
      >
        {/* Lets Connect */}
        <div className="flex grow basis-0 flex-col gap-6">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Let's connect!
          </h1>
          <Image
            src={"/images/ContactUs.png"}
            alt=""
            width={1000}
            height={600}
            className="w-full rounded-xl"
          />

          <div className="2xs:h-60 relative mx-auto mt-4 h-65 md:mx-0 md:h-60 lg:h-80">
            <h2 className="sm:3xl w-fit text-center text-2xl font-medium text-black/60 md:-rotate-12 md:text-left lg:text-4xl">
              You can{" "}
              <span className="text-black/90">
                contact <br className="hidden md:block" /> us
              </span>{" "}
              <br className="md:hidden" />
              through <br className="hidden md:block" /> the following
            </h2>
            <Image
              src={"/images/contactusarrow.png"}
              alt=""
              width={300}
              height={300}
              className="animate-wiggle animate-infinite animate-duration-[2000ms] animate-delay-1000 animate-ease-in-out absolute scale-70 md:top-4 md:left-55 md:scale-80 lg:top-8 lg:left-65 lg:scale-90"
            />
          </div>

          <div className="*:text-md grid grid-cols-1 gap-4 text-lg font-light text-neutral-500 *:flex *:flex-col *:items-center *:justify-center *:gap-1 *:rounded-lg *:border-2 *:border-neutral-300 *:bg-white *:px-4 *:py-20 *:shadow-lg *:sm:text-lg lg:grid-cols-2 *:lg:flex-row *:xl:flex-col *:2xl:flex-row">
            <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-20">
              <EnvelopeIcon className="size-6" /> cicssg@dlsud.edu.ph
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-20">
              <FaFacebook className="size-6" />
              @DLSUD.CICSSG
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-20">
              <FaInstagram className="size-6" />
              @dlsud.cicssg
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-20">
              <MapPinIcon className="size-6" />
              PCH 102, DLSU-D
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex grow basis-0 flex-col gap-4">
          <p className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Complete the form below to take the first step!
          </p>
          <p className="text-xl font-medium">
            Tell us about yourself and your concern, and we will get back to you
            with an answer or solution.
          </p>
          <p className="text-lg font-medium text-black/70">
            Want to send an anonymous message?{" "}
            <Link href="#anonymous" className="text-black/95 underline">
              Click here
            </Link>
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-md/4 flex flex-col items-stretch gap-6 text-xl sm:text-lg/5 lg:text-xl/6"
          >
            <div>
              <label
                htmlFor="name"
                className="text-md/4 block font-medium text-gray-900 sm:text-lg/5 lg:text-xl/6"
              >
                Name <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="name"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register("name", { required: true })}
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
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register("email", { required: true })}
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
                <span className="ml-auto text-sm text-black/40">Optional</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="phone"
                    type=""
                    placeholder="09xxxxxxxxx"
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                    {...register("phone", { required: false })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 *:grow *:basis-0 lg:flex-row">
              <div>
                <div className="flex flex-row">
                  <label
                    htmlFor="gender"
                    className="block w-full text-xl/6 font-medium text-gray-900"
                  >
                    Mx.
                  </label>
                  <span className="ml-auto text-sm leading-6 text-black/40">
                    Optional
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="gender"
                    defaultValue=""
                    className="focus:blue-300 text-md/4 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-lg/5 lg:text-xl/6"
                    {...register("gender", { required: false })}
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
                    className="focus:blue-300 text-md/4 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register("person", { required: true })}
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
                  className="focus:blue-300 text-md/4 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-lg/5 lg:text-xl/6"
                  required
                  {...register("concern", { required: true })}
                >
                  <option value=""></option>
                  <option value="inquiry">Inquiry</option>
                  <option value="enrollment">Enrollment</option>
                  <option value="payment">Payment</option>
                  <option value="other">Other</option>
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
                <span className="ml-auto text-sm text-black/40">
                  Max {CONCERN_CHARACTERS_MAX} characters
                </span>
              </div>

              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <textarea
                    id="message"
                    maxLength={CONCERN_CHARACTERS_MAX}
                    rows={15}
                    onKeyUp={(e) =>
                      setCharacter(
                        (e.target as HTMLTextAreaElement).value.length,
                      )
                    }
                    placeholder="Tell us about your concern..."
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                    required
                    {...register("message", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <span
                className={`text-sm text-black/40 ${character == 0 ? "hidden" : null}`}
              >
                {CONCERN_CHARACTERS_MAX - character} characters left
              </span>
            </div>

            <button
              type="submit"
              className="rounded-full bg-neutral-900 bg-[url(/images/noise.png)] py-3 text-xl font-semibold text-white hover:cursor-pointer hover:bg-neutral-950"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <section
        id="anonymous"
        className="grid grid-cols-1 gap-8 *:rounded-2xl *:bg-neutral-100 *:px-8 *:py-8 xl:grid-cols-2 *:xl:px-12"
      >
        {/* Message */}
        <div className="flex flex-col gap-8 xl:col-span-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Anonymous Concern
            </h1>
            <p className="text-xl font-medium">
              We value your privacy. If you prefer to remain anonymous, please
              use the form below.
            </p>
            <p className="text-lg font-medium text-black/70">
              Want to send an identified message?{" "}
              <Link href="#identified" className="text-black/95 underline">
                Click here
              </Link>
            </p>
          </div>

          <form
            id="anonymous-message-form"
            onSubmit={handleAnonymousSubmit}
            className="flex flex-col items-stretch gap-4 text-xl sm:text-lg/5 lg:text-xl/6"
          >
            <div>
              <div className="flex flex-row">
                <label
                  htmlFor="message"
                  className="block text-xl/6 font-medium text-gray-900"
                >
                  How can we help you? <span className="text-red-700">*</span>
                </label>
                <span className="ml-auto text-sm text-black/40">
                  Max {CONCERN_CHARACTERS_MAX} characters
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <textarea
                    id="message"
                    name="messages"
                    maxLength={CONCERN_CHARACTERS_MAX}
                    rows={10}
                    onKeyUp={(e) =>
                      setAnonymousCharacter(
                        (e.target as HTMLTextAreaElement).value.length,
                      )
                    }
                    placeholder="Tell us about your concern..."
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                    required
                  />
                </div>
              </div>
              <span
                className={`text-sm text-black/40 ${anonymousCharacter == 0 ? "hidden" : null}`}
              >
                {CONCERN_CHARACTERS_MAX - anonymousCharacter} characters left
              </span>
            </div>

            <div>
              <div className="flex flex-row">
                <label
                  htmlFor="email"
                  className="block w-full text-xl/6 font-medium text-gray-900"
                >
                  Email (Optional)
                </label>
                <span className="ml-auto text-sm text-black/40">Optional</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juandelacruz@gmail.com"
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                  />
                </div>
              </div>
              <span className={`text-sm text-black/40`}>
                We'll only use this to notify you when you receive a response.
              </span>
            </div>

            <button
              type="submit"
              className="rounded-full bg-neutral-900 bg-[url(/images/noise.png)] py-3 text-xl font-semibold text-white hover:cursor-pointer hover:bg-neutral-950"
            >
              Send Anonymous Message
            </button>
          </form>
        </div>

        {/* View a Submission */}
        <div className="flex h-fit flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              View a Submission
            </h1>
            <p className="text-lg font-medium text-black/80">
              Have a submission made on a different device? We got you! You can
              still track it by providing the submission ID
            </p>
            <hr />
          </div>

          <form
            onSubmit={handleViewSubmission}
            id="view-submission-form"
            className="flex flex-col items-stretch gap-4 text-xl sm:text-lg/5 lg:text-xl/6"
          >
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <div className="flex flex-row">
                <label
                  htmlFor="submissionId"
                  className="block w-full text-xl/6 font-medium text-gray-900"
                >
                  Submission ID
                </label>
              </div>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-300">
                  <input
                    id="submissionId"
                    name="submissionId"
                    type="text"
                    placeholder="Pioneer-xxxxxxxxxx"
                    className="text-md/4 block min-w-0 grow py-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-lg/5 lg:text-xl/6"
                    pattern="^Pioneer-[0-9a-zA-Z]{10}$"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-full bg-neutral-900 bg-[url(/images/noise.png)] py-3 text-xl font-semibold text-white hover:cursor-pointer hover:bg-neutral-950"
            >
              View Submission
            </button>
          </form>
        </div>

        {/* Previous Submissions */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Previous Submissions
            </h1>
            <p className="text-lg font-medium text-black/80">
              All your previous anonymous submissions can be viewed here.
            </p>
            <hr />
          </div>

          {/* SUBMISSION LIST */}
          <ul className="list h-[32rem] gap-1 overflow-y-auto *:px-2">
            {submissionData.map((submission: AnonymousData) => (
              <li
                className={`list-row flex flex-row ${submission.messages[submission.messages.length - 1].from == "CICSSG" ? "bg-black/10" : ""}`}
                key={submission.id}
              >
                <div className="block w-8/10 grow">
                  <div className="font-bold">Pioneer-{submission.id}</div>
                  <div className="float-left inline-block w-[calc(100%)] overflow-hidden text-xs font-semibold text-nowrap text-ellipsis whitespace-nowrap opacity-100">
                    {submission.messages[submission.messages.length - 1].from}:{" "}
                    {
                      submission.messages[submission.messages.length - 1]
                        .content
                    }
                  </div>
                </div>
                <Link
                  href={`/contact-us/${submission.id}`}
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <span className="text-md mt-auto text-black/50">
            Note: submission history is only saved locally.
          </span>
        </div>
      </section>

      <div>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white/95 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 sm:mx-0 sm:size-10">
                      <CheckBadgeIcon
                        aria-hidden="true"
                        className="size-6 text-green-400"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-black/80"
                      >
                        Success!
                      </DialogTitle>
                      <div className="mt-2 flex flex-col gap-4">
                        <p className="text-sm text-black/70">
                          Your anonymous submission has been received. Please
                          note down your submission ID for future reference.
                        </p>
                        <div
                          onClick={copylink}
                          className="w-full rounded-xl bg-black/10 text-center text-black/80 hover:cursor-pointer hover:bg-black/15"
                        >
                          <p>{copyText}</p>
                          <code className="text-xl font-bold">
                            {submissionId}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-black/10 px-3 py-2 text-sm font-semibold text-black inset-ring inset-ring-white/5 hover:cursor-pointer hover:bg-black/20 sm:mt-0 sm:w-auto"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ContactUs;
