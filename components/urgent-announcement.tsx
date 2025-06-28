"use client";
import { Button } from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { act, useEffect, useRef, useState } from "react";
import { PublicUrgentAnnounementData } from "./public-documents-data";
import Link from "next/link";

export type UrgentAnnouncementDocumentData = {
  id: number;
  announcement: string;
  date: string;
  visibility: boolean;
  time_visibility: boolean;
  button_text: string;
  button_link: string;
  button_visibility: boolean;
};

export default function UrgentAnnouncement() {
  const [documents, setDocuments] = useState<UrgentAnnouncementDocumentData[] | null>(null);
  const [visibility, setVisibility] = useState(false);
  const [timeVisibility, setTimeVisibility] = useState(false);
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [time, setTime] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    PublicUrgentAnnounementData().then(({ documents }) => {
      setDocuments(documents ?? null);
    });
  }, []);

  useEffect(() => {
    if (documents) {
      const activeDocument = documents[0];

      setVisibility(activeDocument.visibility);
      setTimeVisibility(activeDocument.time_visibility);
      setButtonVisibility(activeDocument.button_visibility);

      const timeRaw = Math.floor(
        (Date.parse(activeDocument.date) - Date.now()) / 1000,
      );
      setTime(timeRaw);
    }
  }, [documents]);

  return (
      <div
        className={`relative flex w-full flex-col flex-wrap items-center justify-center gap-4 overflow-hidden rounded-b-2xl bg-linear-90 from-white/80 via-white/95 to-white/80 px-3 py-1 text-xl font-bold md:flex-row ${visibility == false && "hidden"}`}
      >
        <h1 className="text-center font-semibold">
          {documents && documents[0].announcement}
        </h1>
        <div className={`${!timeVisibility && "hidden"}`}>
          {Countdown(time)}
        </div>
        <Link
          href={documents ? documents[0].button_link : ""}
          target="_blank"
          className={`flex flex-row items-center rounded-lg bg-black/90 px-3 py-2 text-white hover:bg-black/80 ${!buttonVisibility && "hidden"}`}
        >
          <span className="text-sm font-semibold">
            {documents && documents[0].button_text}
          </span>
          <ChevronRightIcon className="size-6 animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-linear" />
        </Link>
        <Button
          className="absolute right-2 text-black hover:cursor-pointer"
          onClick={(e) => setVisibility(false)}
        >
          <XMarkIcon className="size-8" />
        </Button>
      </div>
    );
}

function Countdown(timeLeft: number) {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setDays(Math.floor(timeLeft / (3600 * 24)));
    setHours(Math.floor((timeLeft % (3600 * 24)) / 3600));
    setMinutes(Math.floor((timeLeft % 3600) / 60));
    setSeconds(Math.floor(timeLeft % 60));
  }, [timeLeft]);

  return (
    <div className="grid auto-cols-max grid-flow-col gap-2 text-center font-normal">
      {days != 0 && (
        <div className="text-xs">
          <span className="countdown mx-auto font-mono text-3xl">
            <span
              style={{ "--value": days } as React.CSSProperties}
              aria-live="polite"
            ></span>
          </span>
          days
        </div>
      )}
      {(days != 0 || hours != 0) && (
        <div className="text-xs">
          <span className="countdown mx-auto font-mono text-3xl">
            <span
              style={{ "--value": hours } as React.CSSProperties}
              aria-live="polite"
            ></span>
          </span>
          hours
        </div>
      )}
      <div className="text-xs">
        <span className="countdown mx-auto font-mono text-3xl">
          <span
            style={{ "--value": minutes } as React.CSSProperties}
            aria-live="polite"
          ></span>
        </span>
        min
      </div>
      <div className="text-xs">
        <span className="countdown mx-auto font-mono text-3xl">
          <span
            style={{ "--value": seconds } as React.CSSProperties}
            aria-live="polite"
          ></span>
        </span>
        sec
      </div>
    </div>
  );
}
