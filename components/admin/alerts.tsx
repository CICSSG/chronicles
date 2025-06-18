"use client";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

export default function AdminAlerts({
  type,
  text,
}: {
  type: string;
  text: string;
}) {
  const [isShowingAlert, setShowingAlert] = useState(true);

  return (
    <div
      className={`alert w-fit animate-fade animate-duration-500 animate-delay-[4000ms] animate-ease-in-out animate-reverse opacity-100 ${type == "info" && "alert-info"} ${type == "success" && "alert-success"} ${type == "error" && "alert-error"} ${type ?? "alert-info"}`}
      onTransitionEnd={() => setShowingAlert(false)}
    >
      <InfoIcon />
      {text}
    </div>
  );
}
