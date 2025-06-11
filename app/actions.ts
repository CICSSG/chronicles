"use server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { imgurUpload } from "@/utils/imgur-upload";
import { useState } from "react";

export async function createNewDocument(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const title = formData.get("title");
  const date = formData.get("date");
  const documentType = formData.get("document_type");
  const description = formData.get("description");
  const author = formData.get("author");
  const fileLink = formData.get("file_link");
  const image = formData.get("image");
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        title: title,
        date: date,
        document_type: documentType,
        description: description,
        author: author,
        link: fileLink,
        // image: image,
        // external_links: externalLinks
      },
    ])
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editDocumentPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const title = formData.get("title");
  const date = formData.get("date");
  const documentType = formData.get("document_type");
  const description = formData.get("description");
  const author = formData.get("author");
  const fileLink = formData.get("file_link");
  // const image = formData.get("image")
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)
  const { data, error } = await supabase
    .from("documents")
    .update({
      title: title,
      date: date,
      document_type: documentType,
      description: description,
      author: author,
      link: fileLink,
      // image: image,
      // external_links: externalLinks
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function deleteDocumentPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  console.log(error?.message);
}

export async function createAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const title = formData.get("title");
  const date = formData.get("date");
  const description = formData.get("description");
  const postLink = formData.get("post_link");
  const image = formData.get("image");

  const { error } = await supabase
    .from("announcements")
    .insert([
      {
        title: title,
        date: date,
        description: description,
        link: postLink,
        image: image,
      },
    ])
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const title = formData.get("title");
  const date = formData.get("date");
  const description = formData.get("description");
  const postLink = formData.get("post_link");
  const image = formData.get("image");
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)

  if (!image) {
    const { data, error } = await supabase
      .from("announcements")
      .update({
        title: title,
        date: date,
        description: description,
        link: postLink,
        // external_links: externalLinks
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    console.log(error?.message);
  } else {
    const { data, error } = await supabase
      .from("announcements")
      .update({
        title: title,
        date: date,
        description: description,
        link: postLink,
        image: image,
        // external_links: externalLinks
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    console.log(error?.message);
  }
}

export async function deleteAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  console.log(error?.message);
}

// EVENTS //
export async function createEventPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const title = formData.get("title");
  const image = formData.get("image");
  const date = formData.get("date");
  const academicYear = formData.get("academic_year");
  const location = formData.get("location");
  const expenses = formData.get("expenses");
  const description = formData.get("description");
  const documentationLink = formData.get("documentation_link");
  const highlightsRaw = formData.get("highlights");
  const highlights =
    typeof highlightsRaw === "string"
      ? JSON.parse(highlightsRaw)
      : highlightsRaw;
  const projectHeadsRaw = formData.get("project_heads");
  const projectHeads =
    typeof projectHeadsRaw === "string"
      ? JSON.parse(projectHeadsRaw)
      : projectHeadsRaw;

  const { error } = await supabase
    .from("events")
    .insert([
      {
        title: title,
        image: image,
        date: date,
        academic_year: academicYear,
        location: location,
        project_heads: projectHeads,
        expenses: expenses,
        highlights: highlights,
        description: description,
        link: documentationLink,
      },
    ])
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editEventPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const title = formData.get("title");
  const image = formData.get("image");
  const date = formData.get("date");
  const academicYear = formData.get("academic_year");
  const location = formData.get("location");
  const expenses = formData.get("expenses");
  const description = formData.get("description");
  const documentationLink = formData.get("documentation_link");
  const highlightsRaw = formData.get("highlights");
  const highlights =
    typeof highlightsRaw === "string"
      ? JSON.parse(highlightsRaw)
      : highlightsRaw;
  const projectHeadsRaw = formData.get("project_heads");
  const projectHeads =
    typeof projectHeadsRaw === "string"
      ? JSON.parse(projectHeadsRaw)
      : projectHeadsRaw;
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)

  if (!image) {
    const { data, error } = await supabase
      .from("events")
      .update({
        title: title,
        date: date,
        academic_year: academicYear,
        location: location,
        project_heads: projectHeads,
        expenses: expenses,
        highlights: highlights,
        description: description,
        link: documentationLink,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    console.log(error?.message);
  } else {
    const { data, error } = await supabase
      .from("events")
      .update({
        title: title,
        image: image,
        date: date,
        academic_year: academicYear,
        location: location,
        project_heads: projectHeads,
        expenses: expenses,
        highlights: highlights,
        description: description,
        link: documentationLink,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    console.log(error?.message);
  }
}

export async function deleteEventPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  console.log(error?.message);
}

export async function editImagePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const image = formData.get("image");

  const { error } = await supabase
    .from("slate")
    .update([
      {
        image: image,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editAdviserPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const image = formData.get("image");

  const { error } = await supabase
    .from("slate")
    .update([
      {
        adviser: {
          name: name,
          image: image,
        },
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editGovernorPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const image = formData.get("image");

  const { error } = await supabase
    .from("slate")
    .update([
      {
        governor: {
          name: name,
          image: image,
        },
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editViceGovernorPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const image = formData.get("image");

  const { error } = await supabase
    .from("slate")
    .update([
      {
        vice_governor: {
          name: name,
          image: image,
        },
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function deleteSlatePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("slate")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  console.log(error?.message);
}

export async function createSlatePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const academic_year = formData.get("academic_year");

  const { error } = await supabase
    .from("slate")
    .insert([
      {
        academic_year: academic_year,
        adviser: {
          name: "",
          image: "",
        },
        governor: {
          name: "",
          image: "",
        },
        vice_governor: {
          name: "",
          image: "",
        },
      },
    ])
    .select();

  console.log(error?.message);
}

export async function createOfficerPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const position = formData.get("position");
  const image = formData.get("image");

  const { data } = await supabase
    .from("slate")
    .select("directorate")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const directorate = data?.[0]?.directorate || [];
  directorate.push({ name, position, image });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        directorate: directorate,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editOfficerPOST(formData: FormData) {
  var filtered;
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const id_name = formData.get("id_name");
  const name = formData.get("name");
  const position = formData.get("position");
  const image = formData.get("image");

  const { data } = await supabase
    .from("slate")
    .select("directorate")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const directorate = data?.[0]?.directorate || [];

  filtered = directorate.map((item: any) =>
    item.name === id_name ? { name, position, image } : item,
  );

  const { error } = await supabase
    .from("slate")
    .update([
      {
        directorate: filtered,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
}

export async function deleteOfficerPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");

  const { data } = await supabase
    .from("slate")
    .select("directorate")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const directorate = data?.[0]?.directorate || [];
  const filtered = directorate.filter(
    (officer: { name: string }) => officer.name !== name,
  );

  const { error } = await supabase
    .from("slate")
    .update([
      {
        directorate: filtered,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
}

export async function createLegislativePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const position = formData.get("position");
  const image = formData.get("image");

  const { data } = await supabase
    .from("slate")
    .select("legislative")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const legislative = data?.[0]?.legislative || [];
  legislative.push({ name, position, image });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        legislative: legislative,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editLegislativePOST(formData: FormData) {
  var filtered;
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const id_name = formData.get("id_name");
  const name = formData.get("name");
  const position = formData.get("position");
  const image = formData.get("image");

  const { data } = await supabase
    .from("slate")
    .select("legislative")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const legislative = data?.[0]?.legislative || [];

  filtered = legislative.map((item: any) =>
    item.name === id_name ? { name, position, image } : item,
  );

  const { error } = await supabase
    .from("slate")
    .update([
      {
        legislative: filtered,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
}

export async function deleteLegislativePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");

  const { data } = await supabase
    .from("slate")
    .select("legislative")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const legislative = data?.[0]?.legislative || [];
  const filtered = legislative.filter(
    (officer: { name: string }) => officer.name !== name,
  );

  const { error } = await supabase
    .from("slate")
    .update([
      {
        legislative: filtered,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
}

export async function createJuniorOfficerPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const position = formData.get("position");
  const image = formData.get("image");

  const { data } = await supabase
    .from("slate")
    .select("junior_officers")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const junior_officers = data?.[0]?.junior_officers || [];
  junior_officers.push({ name, position, image });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        junior_officers: junior_officers,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editJuniorOfficerPOST(formData: FormData) {
  var filtered;
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const id_name = formData.get("id_name");
  const name = formData.get("name");
  const position = formData.get("position");
  const image = formData.get("image");

  const { data } = await supabase
    .from("slate")
    .select("junior_officers")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const junior_officers = data?.[0]?.junior_officers || [];

  filtered = junior_officers.map((item: any) =>
    item.name === id_name ? { name, position, image } : item,
  );

  const { error } = await supabase
    .from("slate")
    .update([
      {
        junior_officers: filtered,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
}

export async function deleteJuniorOfficerPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");

  const { data } = await supabase
    .from("slate")
    .select("junior_officers")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const junior_officers = data?.[0]?.junior_officers || [];
  const filtered = junior_officers.filter(
    (officer: { name: string }) => officer.name !== name,
  );

  const { error } = await supabase
    .from("slate")
    .update([
      {
        junior_officers: filtered,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
}

export async function createCommitteePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const committee_name = formData.get("committee_name");
  const head = formData.get("committee_head_list");
  const committees = formData.get("committee_list");

  const { data } = await supabase
    .from("slate")
    .select("committees")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const committee: { [key: string]: any } = data?.[0]?.committees || {};
  if (typeof committee_name === "string") {
    committee[committee_name] = {
      head: JSON.parse(head as string) || [],
      committees: JSON.parse(committees as string) || [],
    };
  }

  const sortedKeys = Object.keys(committee).sort();
  const sortedCommittee: { [key: string]: any } = {};
  sortedKeys.forEach((key) => {
    sortedCommittee[key] = committee[key];
  });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        committees: sortedCommittee,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error?.message);
  // console.log(data)
}

export async function editCommitteePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const id_committee_name = formData.get("id_committee_name");
  const committee_name = formData.get("committee_name");
  const head = formData.get("committee_head_list");
  const committees = formData.get("committee_list");

  const { data } = await supabase
    .from("slate")
    .select("committees")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const committee: { [key: string]: any } = data?.[0]?.committees || {};
  if (typeof id_committee_name === "string" && typeof committee_name === "string") {
    if (committee_name === id_committee_name) {
      committee[id_committee_name] = {
        head: JSON.parse(head as string) || [],
        committees: JSON.parse(committees as string) || [],
      };
    } else {
      committee[committee_name] = {
        head: JSON.parse(head as string) || [],
        committees: JSON.parse(committees as string) || [],
      };
      delete committee[id_committee_name];
    }
  }

  const sortedKeys = Object.keys(committee).sort();
  const sortedCommittee: { [key: string]: any } = {};
  sortedKeys.forEach((key) => {
    sortedCommittee[key] = committee[key];
  });

  const { error } = await supabase
    .from('slate')
    .update([
      {
        committees: sortedCommittee
      },
    ])
    .eq('id', id !== null ? parseInt(id as string, 10) : undefined)
    .select()

  console.log(error?.message)
}

export async function deleteCommitteePOST(formData: FormData) {
  console.log("delete committee post")
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const committee_name = formData.get("committee_name");

  const { data } = await supabase
    .from("slate")
    .select("committees")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const committee: { [key: string]: any } = data?.[0]?.committees || {};
  if (typeof committee_name === "string") {
    delete committee[committee_name];
  }

  const sortedKeys = Object.keys(committee).sort();
  const sortedCommittee: { [key: string]: any } = {};
  sortedKeys.forEach((key) => {
    sortedCommittee[key] = committee[key];
  });

  const { error } = await supabase
    .from('slate')
    .update([
      {
        committees: sortedCommittee
      },
    ])
    .eq('id', id !== null ? parseInt(id as string, 10) : undefined)
    .select()

  console.log(error?.message)
}
