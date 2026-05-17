"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SlatesData } from "@/components/admin/documents-data";
import OfficersOverview from "@/components/admin/officers/overview";
import ExecutiveOverview from "@/components/admin/officers/executive";
import LegislativeOverview from "@/components/admin/officers/legislative";
import JuniorOfficerOverview from "@/components/admin/officers/junior-officer";
import CommitteesOverview from "@/components/admin/officers/committees";
import { CreatePopup } from "@/components/admin/alert-fragment";

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

  if(slug[1] === "committees") {
    return <CommitteesOverview document={document} />;
  }
}
