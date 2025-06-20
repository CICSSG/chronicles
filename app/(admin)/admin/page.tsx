"use client";
import QuickUrgentAnnouncementAdmin from "@/components/admin/urgent-announcement";
import { GetTableRows } from "@/utils/get-table-rows";
import { Button, Field, Input, Label } from "@headlessui/react";
import { createClient } from "@supabase/supabase-js";
import clsx from "clsx";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function ProtectedPage() {
  const [tables, setTables] = useState();
  


  useEffect(() => {
    GetTableRows()
      .then((res) => res.json())
      .then((data) => {
        setTables(data);
      });
  }, []);

  return (
    <div className="grid w-full grid-cols-1 xl:grid-cols-2 gap-4 text-black">
      <QuickUrgentAnnouncementAdmin />
      <div className="flex h-fit w-full flex-col gap-4 rounded-2xl bg-white/80 p-6">
        <h1 className="text-2xl font-semibold">Data Count</h1>
        <div className="grid grid-cols-2 justify-around gap-x-3 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
          {tables &&
            typeof tables === "object" &&
            Object.entries(tables).map(
              ([tableName, tableRows]: [string, any], idx: number) => (
                <div
                  key={tableName}
                  className="flex h-fit shrink-0 grow basis-0 flex-col-reverse items-center justify-center gap-3"
                >
                  <h2 className="text-lg font-bold capitalize">{tableName}</h2>
                  <div
                    className="radial-progress font-bold text-blue-400"
                    style={{ "--value": 100 } as React.CSSProperties}
                    aria-valuenow={70}
                    role="progressbar"
                  >
                    {tableRows}
                  </div>
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  );
}
