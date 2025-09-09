"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  SendReply,
  SlatesData,
  SulongData,
} from "@/components/admin/documents-data";
import { createClient } from "@supabase/supabase-js";
import { CreatePopup } from "@/components/admin/alert-fragment";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { AnonymousData } from "@/app/(index)/contact-us/page";
import Link from "next/link";
import { sendAnonymousEmail } from "@/utils/send-email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function Page() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  const [documents, setDocuments] = useState<AnonymousData[] | null>(null);
  const [submission, setSubmission] = useState<AnonymousData | null>(null);

  useEffect(() => {
    SulongData().then(({ documents, pagination }) => {
      setDocuments(documents ?? null);
    });
  }, []);

  useEffect(() => {
    if (!slug) return;
    SulongData(slug).then(({ documents }) => {
      setSubmission(documents && documents[0] ? documents[0] : null);
    });

    const taskListener = supabase
      .channel("public:data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "anonymous" },
        (payload) => {
          SulongData(slug).then(({ documents }) => {
            setSubmission(documents && documents[0] ? documents[0] : null);
          });

          SulongData().then(({ documents, pagination }) => {
            setDocuments(documents ?? null);
          });

          CreatePopup("Data updated");
          // console.log("Change received!", payload);
        },
      )
      .subscribe();

    return () => {
      taskListener.unsubscribe();
    };
  }, [slug]);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current) return;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (parentRef.current) {
              parentRef.current.scrollTop = parentRef.current.scrollHeight;
            }
          });
        }
      }
    });

    observer.observe(parentRef.current, { childList: true });

    return () => observer.disconnect();
  }, []);

  function handleSubmitAnonymous(data: {
    email: string;
    id: string;
    type: string;
  }) {
    sendAnonymousEmail(data);
  }

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    if (!message || message.trim().length === 0) return;

    const messages = [
      ...(submission?.messages ?? []),
      {
        from: "CICSSG",
        content: message,
        sent_at: new Date().toISOString().toString(),
      },
    ];

    SendReply(slug, messages).then((data) => {
      if (data.success) {
        if (submission?.email && submission.email != "") {
          handleSubmitAnonymous({
            email: submission?.email ?? "",
            id: submission?.id ?? "",
            type: "Reply",
          });
        }
        (
          document.getElementById("message-form") as HTMLFormElement | null
        )?.reset();
        setSubmission(data.documents && data.documents[0]);
      } else {
        // Handle error
        console.error("Error sending message:");
      }
    });
  }

  return (
    <div className="flex w-full flex-col gap-4 text-black/80 *:rounded-2xl">
      <div className="flex flex-row justify-between rounded-2xl bg-neutral-100 bg-linear-to-r from-black/2 via-black/2 via-70% to-black/20 px-10 py-8">
        <Link
          href={"/admin/sulong"}
          className="flex flex-row gap-3 align-middle text-3xl font-bold hover:text-black"
        >
          <ArrowLeftCircleIcon className="size-8" /> Go back
        </Link>
        <h2 className="text-3xl">Messages</h2>
      </div>

      <section
        id="anonymous"
        className="grid grid-cols-1 gap-8 *:rounded-2xl *:bg-neutral-100 *:px-8 *:py-8 xl:grid-cols-3 *:xl:px-12"
      >
        {/* View a Submission */}
        <div className="flex flex-col gap-4 xl:col-span-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              Pioneer-{submission?.id}
            </h1>
            <p className="text-lg font-medium text-black/80">
              Last Updated:{" "}
              {submission
                ? new Date(submission.updated_at).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A"}
            </p>
          </div>

          <div
            ref={parentRef}
            className="flex h-[36rem] grow flex-col gap-2 overflow-y-auto rounded-2xl border-1 border-black/30 bg-white p-4"
          >
            {submission && submission.messages.length > 0 ? (
              submission.messages.map(
                (
                  message: { from: string; content: string; sent_at: string },
                  i: number,
                ) => (
                  <div className="flex h-fit w-full flex-row gap-2" key={i}>
                    <div className="avatar rounded-full bg-white">
                      <div className="h-8 w-8 rounded-full">
                        <img
                          src={
                            message.from == "CICSSG"
                              ? "/images/TheCICSSG.png"
                              : "/images/user-avatar.jpg"
                          }
                        />
                      </div>
                    </div>

                    <div className="py-auto h-full text-sm/8 font-normal">
                      {message.content}
                    </div>

                    <div className="py-auto h-full text-sm/8 font-normal text-nowrap text-black/50">
                      -{" "}
                      {new Date(message.sent_at).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                ),
              )
            ) : (
              <div>No messages found.</div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            id="message-form"
            className="join w-full"
          >
            <div className="w-full">
              <label className="input validator join-item w-full bg-black/10 text-black">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Enter a message"
                  name="message"
                  autoComplete="off"
                  required
                />
              </label>
            </div>
            <button className="btn btn-neutral join-item" type="submit">
              Send
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

          <ul className="list h-[36rem] gap-1 overflow-y-auto *:px-2">
            {documents?.map((submission: AnonymousData) => (
              <li
                className={`list-row flex flex-row ${submission.messages[submission.messages.length - 1].from == "You" ? "bg-black/10" : ""}`}
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
                  href={`/admin/sulong/${submission.id}`}
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
        </div>
      </section>
    </div>
  );
}
