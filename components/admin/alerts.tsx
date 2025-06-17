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
    <div className={`alert alert-success opacity-100 animate-fade animate-duration-500 animate-delay-[4000ms] animate-ease-in-out animate-reverse`} onTransitionEnd={() => setShowingAlert(false)}>
      <InfoIcon />
      {text}
    </div>
  );
}

