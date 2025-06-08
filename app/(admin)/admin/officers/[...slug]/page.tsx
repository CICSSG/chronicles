"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlatesData } from "@/components/admin/documents-data";
import OfficersOverview from "@/components/admin/officers/overview";
import ExecutiveOverview from "@/components/admin/officers/executive";
import LegislativeOverview from "@/components/admin/officers/legislative";
import JuniorOfficerOverview from "@/components/admin/officers/junior-officer";
import { createClient } from "@supabase/supabase-js";

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
        ? params.slug
        : "";

  const [document, setDocument] = useState<any | null>(null);

  useEffect(() => {
    if (!slug) return;
    SlatesData(slug[0]).then(({ documents }) => {
      setDocument(documents && documents[0] ? documents[0] : null);
    });

    const taskListener = supabase
          .channel("public:data")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "slate" },
            (payload) => {
              SlatesData(slug[0]).then(({ documents }) => {
                setDocument(documents && documents[0] ? documents[0] : null);
              });
              // console.log("Change received!", payload);
            },
          )
          .subscribe();
    
        return () => {
          taskListener.unsubscribe();
        };
  }, [slug]);

  if (slug.length === 1) {
    return <OfficersOverview document={document} />;
  }
    
  if(slug[1] === "executive") {
    return <ExecutiveOverview document={document} />;
  }

  if(slug[1] === "legislative") {
    return <LegislativeOverview document={document} />;
  }

  if(slug[1] === "junior-officers") {
    return <JuniorOfficerOverview document={document} />;
  }
}
