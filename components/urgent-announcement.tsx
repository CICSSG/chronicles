"use client";
import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { act, useEffect, useRef, useState } from "react";
import { PublicUrgentAnnounementData } from "./public-documents-data";

export default function UrgentAnnouncement() {
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [visibility, setVisibility] = useState(false);
  const [timeVisibility, setTimeVisibility] = useState(false);
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
      const timeRaw = Math.floor((Date.parse(activeDocument.date) - Date.now()) / 1000)
      console.log(timeRaw)
      setTime(timeRaw);
    }
  }, [documents]);
  
  return (
    <div
      className={`relative flex w-full flex-row items-center justify-center gap-4 bg-linear-90 from-blue-100 via-white to-blue-100 px-3 py-3 text-xl font-bold ${visibility == false && "hidden"}`}
    >
      <h1 className="font-semibold">{documents && documents[0].announcement}</h1>
      <div className={`${!timeVisibility && "hidden"}`}>
        {Countdown(time)}
      </div>
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
