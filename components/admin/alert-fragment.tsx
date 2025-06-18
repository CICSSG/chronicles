"use client";
// import { Button } from "@headlessui/react";
import AdminAlerts from "./alerts";
import { useEffect, useState } from "react";

var setPopup: React.Dispatch<React.SetStateAction<{ id: number; text: string; type: string }[]>>;

export function CreatePopup(text: string, type?: string) {
    const id = Date.now() + Math.random(); // unique id
    setPopup((prev) => [...prev, { id, text: text, type: type || "info" }]);

    setTimeout(() => {
      setPopup((prev) => prev.filter((p) => p.id !== id));
    }, 5000);
  }

export default function AlertFragment() {
  const [popups, setPopups] = useState<{ id: number; text: string; type: string }[]>([]);

  useEffect(() => {
    setPopup = setPopups
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-end gap-1 transition-all">
        {popups.map((data) => (
          <AdminAlerts key={data.id} text={data.text} type={data.type} />
        ))}
      </div>
    </>
  );
}

