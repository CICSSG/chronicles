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
      <div className="flex flex-col gap-4 w-1/2 p-6 rounded-2xl h-fit bg-white/80">
      <div className="text-black font-semibold text-2xl">
        Data Count
      </div>
        <div className="flex flex-row gap-3 justify-around">
          {tables &&
        typeof tables === "object" &&
        Object.entries(tables).map(
          ([tableName, tableRows]: [string, any], idx: number) => (
            <div key={tableName} className="grow shrink-0 basis-0 h-fit flex flex-col-reverse gap-3 justify-center items-center">
              <h2 className="capitalize font-bold text-lg text-black">{tableName}</h2>
              <div
                className="radial-progress text-blue-400 font-bold"
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
