"use client";
import { GetTableRows } from "@/utils/get-table-rows";
import { createClient } from "@supabase/supabase-js";
import { Key } from "lucide-react";
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
    <>
      <div className="flex h-fit w-full xl:w-1/2 flex-col gap-4 rounded-2xl bg-white/80 p-6">
        <div className="text-2xl font-semibold text-black">Data Count</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 justify-around gap-x-3 gap-y-8">
          {tables &&
            typeof tables === "object" &&
            Object.entries(tables).map(
              ([tableName, tableRows]: [string, any], idx: number) => (
                <div
                  key={tableName}
                  className="flex h-fit shrink-0 grow basis-0 flex-col-reverse items-center justify-center gap-3"
                >
                  <h2 className="text-lg font-bold text-black capitalize">
                    {tableName}
                  </h2>
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
    </>
  );
}
