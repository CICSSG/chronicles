"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnonymousData } from "../page";
import {
  GetAnonymousSubmissions,
  SendMessage,
} from "@/components/public-documents-data";
import Link from "next/link";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { createClient } from "@supabase/supabase-js";
import { sendAnonymousEmail } from "@/utils/send-email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const easterEggMessage = {
  updated_at: new Date().toISOString(),
  messages: [
    {
      from: "You",
      content: "Huy Rumi! It looks like someone else is reading our convo oh?",
      sent_at: new Date().toISOString(),
    },
    {
      from: "CICSSG",
      content: "Frfr Jinu, who is this third party looking at our convo?",
      sent_at: new Date().toISOString(),
    },
    {
      from: "You",
      content: "Have to keep things lowkey for a while muna Rumi.",
      sent_at: new Date().toISOString(),
    },
    {
      from: "CICSSG",
      content: "Kaya nga Jinu, basta ha our plans later?",
      sent_at: new Date().toISOString(),
    },
    {
      from: "You",
      content: "Sige sige Rumi, I'll just finish my pancit canton!",
      sent_at: new Date().toISOString(),
    },
  ],
};

export default function Page() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  const [isLoading, setIsLoading] = useState(true);
  const parentRef = useRef<HTMLDivElement>(null);
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

      const taskListener = supabase
        .channel("public:data")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "anonymous" },
          (payload) => {
            GetAnonymousSubmissions(formattedIds).then((data) => {
              setSubmissionData(data && data.documents ? data.documents : []);
            });
          },
        )
        .subscribe();
    }
    return [];
  });
  const [currentSubmission, setCurrentSubmission] =
    useState<AnonymousData | null>(null);

  useEffect(() => {
    setCurrentSubmission(submissionData.find((sub) => sub.id === slug) || null);
    setIsLoading(false);
  }, [slug, submissionData]);

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

  function handleSubmitAnonymous(data: { id: string; type: string }) {
    sendAnonymousEmail(data);
  }

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    if (!message || message.trim().length === 0) return;

    const messages = [
      ...(currentSubmission?.messages ?? []),
      {
        from: "You",
        content: message,
        sent_at: new Date().toISOString().toString(),
      },
    ];
    SendMessage(slug, messages).then((data) => {
      if (slug == "768bbab0a1") {
        return;
      }
      if (data.success) {
        (
          document.getElementById("message-form") as HTMLFormElement | null
        )?.reset();
        setCurrentSubmission(
          data.documents && data.documents.length > 0
            ? data.documents[0]
            : null,
        );
        if (data.documents && data.documents.length > 0) {
          setSubmissionData((prev) =>
            prev.map((doc) => (doc.id === slug ? data.documents[0] : doc)),
          );
        }
        handleSubmitAnonymous({
          id: currentSubmission?.id ?? "",
          type: "UserReply",
        });
      } else {
        // Handle error
        console.error("Error sending message:");
      }
    });
  }

  return (
    <div className="*w-full flex flex-col gap-4 text-black/80 *:rounded-2xl">
      <div className="flex flex-row justify-between rounded-2xl bg-neutral-100 bg-linear-to-r from-black/2 via-black/2 via-70% to-black/20 px-10 py-8">
        <Link
          href={"/contact-us"}
          className="flex flex-row gap-3 align-middle text-xl font-bold hover:text-black xl:text-3xl"
        >
          <ArrowLeftCircleIcon className="size-6 xl:size-8" /> Go back
        </Link>
        <h2 className="text-xl xl:text-3xl">Messages</h2>
      </div>

      <section
        id="anonymous"
        className="grid grid-cols-1 gap-8 *:rounded-2xl *:bg-neutral-100 *:px-8 *:py-8 xl:grid-cols-3 *:xl:px-12"
      >
        {/* View a Submission */}
        <div className="flex flex-col gap-4 xl:col-span-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {slug == "768bbab0a1"
                ? "Pioneer-768bbab0a1"
                : isLoading
                  ? "Loading..."
                  : currentSubmission
                    ? `Pioneer-${currentSubmission?.id}`
                    : "Invalid ID"}
            </h1>
            <p className="text-lg font-medium text-black/80">
              Last Updated:{" "}
              {currentSubmission
                ? new Date(currentSubmission.updated_at).toLocaleString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    },
                  )
                : new Date(easterEggMessage.updated_at).toLocaleString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    },
                  )}
            </p>
          </div>

          <div
            ref={parentRef}
            className="flex h-96 grow flex-col gap-2 overflow-y-auto rounded-2xl border-1 border-black/30 bg-white p-4"
          >
            {currentSubmission &&
            currentSubmission.messages.length > 0 &&
            slug != "768bbab0a1" ? (
              currentSubmission.messages.map((message, i) => (
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
              ))
            ) : slug != "768bbab0a1" ? (
              <div>No messages found.</div>
            ) : (
              easterEggMessage.messages.map((message, i) => (
                <div className="flex h-fit w-full flex-row gap-2" key={i}>
                  <div className="avatar rounded-full bg-white">
                    <div className="h-8 w-8 rounded-full">
                      <img
                        src={
                          message.from == "CICSSG"
                            ? "/images/Rumi.png"
                            : "/images/Jinu.png"
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
              ))
            )}
          </div>

          <form
            onSubmit={sendMessage}
            id="message-form"
            className="join w-full"
          >
            <div className="w-full">
              <label className="input validator join-item w-full">
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
                  placeholder={
                    slug == "768bbab0a1"
                      ? "Chat is disabled."
                      : "Enter a message"
                  }
                  name="message"
                  autoComplete="off"
                  required
                  disabled={slug == "768bbab0a1"}
                />
              </label>
            </div>
            <button
              disabled={slug == "768bbab0a1"}
              className="btn btn-neutral join-item"
              type="submit"
            >
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
    </div>
  );
}
