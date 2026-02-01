"use server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";

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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

// ANNOUNCEMENTS //

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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

    return error
      ? { success: false, message: error?.message }
      : { success: true };
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

    return error
      ? { success: false, message: error?.message }
      : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const albumLink = formData.get("album_link");
  const description = formData.get("description");
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
        album_link: albumLink,
        highlights: highlights,
        description: description,
      },
    ])
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const albumLink = formData.get("album_link");
  const description = formData.get("description");
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
        album_link: albumLink,
        highlights: highlights,
        description: description,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    return error
      ? { success: false, message: error?.message }
      : { success: true };
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
        album_link: albumLink,
        highlights: highlights,
        description: description,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    return error
      ? { success: false, message: error?.message }
      : { success: true };
  }
}

export async function editEventImagePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const imagesRaw = formData.get("images_data");
  const images = imagesRaw ? JSON.parse(imagesRaw as string) : [];

  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)

  const { data, error } = await supabase
    .from("events")
    .update({
      images: images,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

// IMAGES //
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
  // console.log(data)
}

// SLATE //
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;
  const contactRaw = formData.get("contact_data");
  const contact =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { error } = await supabase
    .from("slate")
    .update([
      {
        governor: {
          name: name,
          image: image,
          position: "Governor",
          responsibilities: responsibilities,
        },
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;
  const contactRaw = formData.get("contact_data");
  const contact =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { error } = await supabase
    .from("slate")
    .update([
      {
        vice_governor: {
          name: name,
          image: image,
          position: "Vice Governor",
          responsibilities: responsibilities,
        },
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;
  const contactRaw = formData.get("contact_data");
  const contact_info =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { data } = await supabase
    .from("slate")
    .select("directorate")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const directorate = data?.[0]?.directorate || [];
  directorate.push({ name, position, image, responsibilities });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        directorate: directorate,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;
  const contactRaw = formData.get("contact_data");
  const contact_info =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { data } = await supabase
    .from("slate")
    .select("directorate")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const directorate = data?.[0]?.directorate || [];

  filtered = directorate.map((item: any) =>
    item.name === id_name ? { name, position, image, responsibilities } : item,
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const image = formData.get("image");
  const contactRaw = formData.get("contact_data");
  const contact_info =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { data } = await supabase
    .from("slate")
    .select("legislative")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const legislative = data?.[0]?.legislative || [];
  legislative.push({ name, image });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        legislative: legislative,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const image = formData.get("image");
  const contactRaw = formData.get("contact_data");
  const contact_info =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { data } = await supabase
    .from("slate")
    .select("legislative")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const legislative = data?.[0]?.legislative || [];

  filtered = legislative.map((item: any) =>
    item.name === id_name ? { name, image } : item,
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;

  const { data } = await supabase
    .from("slate")
    .select("junior_officers")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const junior_officers = data?.[0]?.junior_officers || [];
  junior_officers.push({ name, position, image, responsibilities });

  const { error } = await supabase
    .from("slate")
    .update([
      {
        junior_officers: junior_officers,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;

  const { data } = await supabase
    .from("slate")
    .select("junior_officers")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const junior_officers = data?.[0]?.junior_officers || [];

  filtered = junior_officers.map((item: any) =>
    item.name === id_name ? { name, position, image, responsibilities } : item,
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;

  const { data } = await supabase
    .from("slate")
    .select("committees")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const committee: { [key: string]: any } = data?.[0]?.committees || {};
  if (typeof committee_name === "string") {
    committee[committee_name] = {
      head: JSON.parse(head as string) || [],
      responsibilities: responsibilities,
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

  return error
    ? { success: false, message: error?.message }
    : { success: true };
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
  const responsibilitiesRaw = formData.get("responsibilities_data");
  const responsibilities =
    typeof responsibilitiesRaw === "string"
      ? JSON.parse(responsibilitiesRaw)
      : responsibilitiesRaw;

  const { data } = await supabase
    .from("slate")
    .select("committees")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const committee: { [key: string]: any } = data?.[0]?.committees || {};
  if (
    typeof id_committee_name === "string" &&
    typeof committee_name === "string"
  ) {
    if (committee_name === id_committee_name) {
      committee[id_committee_name] = {
        head: JSON.parse(head as string) || [],
        responsibilities: responsibilities,
        committees: JSON.parse(committees as string) || [],
      };
    } else {
      committee[committee_name] = {
        head: JSON.parse(head as string) || [],
        responsibilities: responsibilities,
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
    .from("slate")
    .update([
      {
        committees: sortedCommittee,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function deleteCommitteePOST(formData: FormData) {
  console.log("delete committee post");
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
    .from("slate")
    .update([
      {
        committees: sortedCommittee,
      },
    ])
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

// FACULTY //
export async function createFacultyPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const name = formData.get("name");
  const department = formData.get("department");
  const work_type = formData.get("work_type");
  const image = formData.get("image");
  const specializationRaw = formData.get("specialization_data");
  const specializations =
    typeof specializationRaw === "string"
      ? JSON.parse(specializationRaw)
      : specializationRaw;

  if (image != "") {
    const { error } = await supabase
      .from("faculty")
      .insert([
        {
          name: name,
          department: department,
          work_type: work_type,
          specialization: specializations,
          image: image,
        },
      ])
      .select();
    return error
      ? { success: false, message: error?.message }
      : { success: true };
  } else {
    const { error } = await supabase
      .from("faculty")
      .insert([
        {
          name: name,
          department: department,
          work_type: work_type,
          specialization: specializations,
        },
      ])
      .select();
    return error
      ? { success: false, message: error?.message }
      : { success: true };
  }
}

export async function editFacultyPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const department = formData.get("department");
  const work_type = formData.get("work_type");
  const image = formData.get("image");
  const specializationRaw = formData.get("specialization_data");
  const specializations =
    typeof specializationRaw === "string"
      ? JSON.parse(specializationRaw)
      : specializationRaw;
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)

  if (!image) {
    const { data, error } = await supabase
      .from("faculty")
      .update({
        name: name,
        department: department,
        work_type: work_type,
        specialization: specializations,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    return error
      ? { success: false, message: error?.message }
      : { success: true };
  } else {
    const { data, error } = await supabase
      .from("faculty")
      .update({
        name: name,
        department: department,
        work_type: work_type,
        specialization: specializations,
        image: image,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    return error
      ? { success: false, message: error?.message }
      : { success: true };
  }
}

export async function deleteFacultyPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("faculty")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

// ADMIN & STAFF //
export async function editAdminStaffPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const dean_name = formData.get("dean_name");
  const dean_image = formData.get("dean_image");
  const assoc_dean_name = formData.get("assoc_dean_name");
  const assoc_dean_image = formData.get("assoc_dean_image");
  const staffRaw = formData.get("staff_data");
  const staff = typeof staffRaw === "string" ? JSON.parse(staffRaw) : staffRaw;

  const { data, error } = await supabase
    .from("admin_staff")
    .update({
      dean: { name: dean_name, image: dean_image },
      associate_dean: { name: assoc_dean_name, image: assoc_dean_image },
      staff: staff,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(id, staff);
  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

// QUICK ANNOUNCEMENT //
export async function createQuickAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const hasActiveAnnouncement = formData.get("active_announcement");
  const announcement = formData.get("announcement");
  const date = formData.get("date");
  const button_text = formData.get("button_text");
  const button_link = formData.get("button_link");
  const timer_visibility = formData.get("timer_visible") == "on" ? true : false;
  const button_visibility =
    formData.get("button_visible") == "on" ? true : false;
  const button_new_tab = formData.get("button_new_tab") == "on" ? true : false;

  if (hasActiveAnnouncement == "false") {
    const { data, error } = await supabase
      .from("urgent_announcement")
      .insert({
        announcement: announcement,
        date: date != "" ? date : null,
        button_text: button_text,
        button_link: button_link,
        time_visibility: timer_visibility,
        button_visibility: button_visibility,
        button_new_tab: button_new_tab,
      })
      .select();

    return error
      ? { success: false, message: error?.message }
      : { success: true };
  } else {
    var id: string = "0";

    let { data: documents } = await supabase
      .from("urgent_announcement")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);

    if (documents && documents.length > 0) {
      id = documents[0].id;
    } else {
      return {
        success: false,
        message: "No urgent announcement found to update.",
      };
    }

    const {} = await supabase
      .from("urgent_announcement")
      .update({
        visibility: false,
      })
      .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
      .select();

    const { data, error } = await supabase
      .from("urgent_announcement")
      .insert({
        announcement: announcement,
        date: date != "" ? date : null,
        button_text: button_text,
        button_link: button_link,
        time_visibility: timer_visibility,
        button_visibility: button_visibility,
        button_new_tab: button_new_tab,
      })
      .select();

    console.log(error);
    return error
      ? { success: false, message: error?.message }
      : { success: true };
  }
}

export async function editQuickAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const announcement = formData.get("announcement");
  const date = formData.get("date");
  const button_text = formData.get("button_text");
  const button_link = formData.get("button_link");
  const timer_visibility = formData.get("timer_visible") == "on" ? true : false;
  const button_visibility =
    formData.get("button_visible") == "on" ? true : false;
  const button_new_tab = formData.get("button_new_tab") == "on" ? true : false;

  const { data, error } = await supabase
    .from("urgent_announcement")
    .update({
      announcement: announcement,
      date: date != "" ? date : null,
      button_text: button_text,
      button_link: button_link,
      time_visibility: timer_visibility,
      button_visibility: button_visibility,
      button_new_tab: button_new_tab,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  console.log(error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function endQuickAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { data, error } = await supabase
    .from("urgent_announcement")
    .update({
      visibility: false,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

// CAMPUS DATA //
export async function createEastCampusPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const name = formData.get("name");
  const number = formData.get("number");
  const location = formData.get("location");
  const description = formData.get("description");
  const image = formData.get("image");
  const servicesRaw = formData.get("services_data");
  const services = servicesRaw ? JSON.parse(servicesRaw as string) : [];
  const organizationRaw = formData.get("organizations_data");
  const organization = organizationRaw
    ? JSON.parse(organizationRaw as string)
    : [];

  const { error } = await supabase
    .from("east_campus")
    .insert([
      {
        name: name,
        number: number,
        location: location,
        services: services,
        organization: organization,
        description: description,
        image: image,
      },
    ])
    .select();

  console.log(error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };

  // return {success: true}
  // console.log(data)
}

export async function editEastCampusPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const number = formData.get("number");
  const location = formData.get("location");
  const description = formData.get("description");
  const image = formData.get("image");
  const servicesRaw = formData.get("services_data");
  const services = servicesRaw ? JSON.parse(servicesRaw as string) : [];
  const organizationRaw = formData.get("organizations_data");
  const organization = organizationRaw
    ? JSON.parse(organizationRaw as string)
    : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)
  const { data, error } = await supabase
    .from("east_campus")
    .update({
      name: name,
      number: number,
      location: location,
      services: services,
      organization: organization,
      description: description,
      image: image,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
  // console.log(data)
}

export async function deleteEastCampusPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("east_campus")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function createWestCampusPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const name = formData.get("name");
  const number = formData.get("number");
  const location = formData.get("location");
  const description = formData.get("description");
  const image = formData.get("image");
  const servicesRaw = formData.get("services_data");
  const services = servicesRaw ? JSON.parse(servicesRaw as string) : [];
  const organizationRaw = formData.get("organizations_data");
  const organization = organizationRaw
    ? JSON.parse(organizationRaw as string)
    : [];

  const { error } = await supabase
    .from("west_campus")
    .insert([
      {
        name: name,
        number: number,
        location: location,
        services: services,
        organization: organization,
        description: description,
        image: image,
      },
    ])
    .select();

  console.log(error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };

  // return {success: true}
  // console.log(data)
}

export async function editWestCampusPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");
  const name = formData.get("name");
  const number = formData.get("number");
  const location = formData.get("location");
  const description = formData.get("description");
  const image = formData.get("image");
  const servicesRaw = formData.get("services_data");
  const services = servicesRaw ? JSON.parse(servicesRaw as string) : [];
  const organizationRaw = formData.get("organizations_data");
  const organization = organizationRaw
    ? JSON.parse(organizationRaw as string)
    : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)
  const { data, error } = await supabase
    .from("west_campus")
    .update({
      name: name,
      number: number,
      location: location,
      services: services,
      organization: organization,
      description: description,
      image: image,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
  // console.log(data)
}

export async function deleteWestCampusPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("west_campus")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function createPanimolaSchedulePOST(formData: FormData) {
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

  const { error } = await supabase
    .from("panimola_timeline")
    .insert([
      {
        title: title,
        date: date,
        description: description,
      },
    ])
    .select();

  console.log(error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };

  // return {success: true}
  // console.log(data)
}

export async function editPanimolaSchedulePOST(formData: FormData) {
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

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)
  const { data, error } = await supabase
    .from("panimola_timeline")
    .update({
      title: title,
      date: date,
      description: description,
    })
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
  // console.log(data)
}

export async function deletePanimolaSchedulePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("panimola_timeline")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function checkFreeBwPages(studentNumber: string) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const getWeekRange = (dateString: string) => {
    const baseDate = new Date(`${dateString}T00:00:00`);
    const day = baseDate.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(baseDate);
    weekStart.setDate(baseDate.getDate() + mondayOffset);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return {
      start: weekStart.toISOString().split("T")[0],
      end: weekEnd.toISOString().split("T")[0],
    };
  };

  // Get current date in GMT+8 (UTC+8)
  const now = new Date();
  const gmt8Date = new Date(
    now.getTime() + 8 * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000,
  );
  const today = gmt8Date.toISOString().split("T")[0];
  const { start, end } = getWeekRange(today);

  const { data: weeklyRows, error: weeklyError } = await supabase
    .from("fetchdesk")
    .select("bw_page_count, print_type, page_count")
    .eq("transaction_type", "printing")
    .eq("student_number", studentNumber)
    .gte("date", start)
    .lte("date", end);

  console.log("Weekly Rows:", weeklyRows, studentNumber, start, end);
  if (weeklyError) {
    return { success: false, message: weeklyError?.message };
  }

  const usedBwPages = (weeklyRows || []).reduce((total: number, row: any) => {
    const bwPages = Number(row?.bw_page_count ?? 0);
    if (bwPages) return total + bwPages;
    if (row?.print_type === "blackAndWhite") {
      return total + Number(row?.page_count ?? 0);
    }
    return total;
  }, 0);

  const freePagesPerWeek = 5;
  const remainingFree = Math.max(0, freePagesPerWeek - usedBwPages);

  return {
    success: true,
    usedBwPages,
    remainingFree,
    weekStart: start,
    weekEnd: end,
  };
}

export async function createFetchDeskPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const extractDataUrl = (value: FormDataEntryValue | null) => {
    if (typeof value !== "string") return null;
    if (!value.startsWith("data:image")) return null;
    return value;
  };

  const getFileExtension = (mimeType: string) => {
    if (mimeType === "image/jpeg") return "jpg";
    if (mimeType === "image/png") return "png";
    if (mimeType === "image/webp") return "webp";
    return "png";
  };

  const uploadSignatureIfNeeded = async (
    value: FormDataEntryValue | null,
    filePrefix: string,
  ) => {
    const dataUrl = extractDataUrl(value);
    if (!dataUrl) return value;

    const [header, base64Data] = dataUrl.split(",");
    if (!header || !base64Data) return value;

    const mimeMatch = header.match(/data:(image\/[a-zA-Z0-9.+-]+);base64/);
    const mimeType = mimeMatch?.[1] ?? "image/png";
    const extension = getFileExtension(mimeType);
    const buffer = Buffer.from(base64Data, "base64");
    const filename = `fetchdesk/signatures/${filePrefix}-${Date.now()}.${extension}`;
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: mimeType,
    });
    return blob.url;
  };

  const transactionType = formData.get("transaction_type");
  const studentNumber = formData.get("student_number");
  const dateRaw = formData.get("date");

  // Get current date in GMT+8 (UTC+8) as default
  const now = new Date();
  const gmt8Date = new Date(
    now.getTime() + 8 * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000,
  );
  const defaultDateGmt8 = gmt8Date.toISOString().split("T")[0];

  const dateValue =
    typeof dateRaw === "string" && dateRaw ? dateRaw : defaultDateGmt8;

  const parseNumber = (value: FormDataEntryValue | null, fallback = 0) => {
    if (value === null) return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const parseJsonArray = (value: FormDataEntryValue | null) => {
    if (!value) return null;
    if (Array.isArray(value)) return value;
    if (typeof value !== "string") return null;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  };

  const getWeekRange = (dateString: string) => {
    const baseDate = new Date(`${dateString}T00:00:00`);
    const day = baseDate.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const weekStart = new Date(baseDate);
    weekStart.setDate(baseDate.getDate() + mondayOffset);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return {
      start: weekStart.toISOString().split("T")[0],
      end: weekEnd.toISOString().split("T")[0],
    };
  };

  let calculatedPrice = parseNumber(formData.get("calculated_price"));
  let freePagesAvailed = formData.get("free_pages_availed") === "true";

  let bwPageCount = parseNumber(formData.get("bw_page_count"));
  let coloredPageCount = parseNumber(formData.get("colored_page_count"));
  const pageCount = parseNumber(formData.get("page_count"));
  const printType = formData.get("print_type");
  if (transactionType === "printing") {
    if (!bwPageCount && !coloredPageCount && pageCount) {
      if (printType === "colored") {
        coloredPageCount = pageCount;
      } else {
        bwPageCount = pageCount;
      }
    }

    const { start, end } = getWeekRange(dateValue);
    const { data: weeklyRows, error: weeklyError } = await supabase
      .from("fetchdesk")
      .select("bw_page_count, print_type, page_count")
      .eq("transaction_type", "printing")
      .eq("student_number", studentNumber)
      .gte("date", start)
      .lte("date", end);

    if (weeklyError) {
      return { success: false, message: weeklyError?.message };
    }
    const usedBwPages = (weeklyRows || []).reduce((total, row: any) => {
      const bwPages = Number(row?.bw_page_count ?? 0);
      if (bwPages) return total + bwPages;
      if (row?.print_type === "blackAndWhite") {
        return total + Number(row?.page_count ?? 0);
      }
      return total;
    }, 0);

    const freePagesPerWeek = 5;
    const remainingFree = Math.max(0, freePagesPerWeek - usedBwPages);
    const freeApplied = Math.min(remainingFree, bwPageCount);
    const chargeableBw = Math.max(0, bwPageCount - freeApplied);

    calculatedPrice = chargeableBw * 2 + Math.max(0, coloredPageCount) * 5;
    freePagesAvailed = usedBwPages >= freePagesPerWeek;
  }
  const rentalItems = parseJsonArray(formData.get("rental_items"));
  const officerSignature = await uploadSignatureIfNeeded(
    formData.get("officer_signature"),
    `officer-${studentNumber ?? "unknown"}`,
  );
  const studentSignature = await uploadSignatureIfNeeded(
    formData.get("student_signature"),
    `student-${studentNumber ?? "unknown"}`,
  );

  const payload = {
    student_name: formData.get("student_name"),
    student_number: studentNumber,
    cys: formData.get("cys"),
    contact_details: formData.get("contact_details"),
    transaction_type: transactionType,
    print_type: formData.get("print_type"),
    page_count: pageCount || bwPageCount + coloredPageCount,
    bw_page_count: bwPageCount,
    colored_page_count: coloredPageCount,
    free_pages_availed: freePagesAvailed,
    rental_item: formData.get("rental_item"),
    rental_items: rentalItems ?? formData.get("rental_items"),
    rental_time: formData.get("rental_time"),
    return_time: formData.get("return_time"),
    status: formData.get("status"),
    calculated_price: calculatedPrice,
    officer_signature: officerSignature,
    student_signature: studentSignature,
    date: dateValue,
  };

  const { error } = await supabase.from("fetchdesk").insert([payload]).select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function editFetchDeskPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const uploadSignatureIfNeeded = async (
    value: FormDataEntryValue | null,
    filePrefix: string,
  ) => {
    if (typeof value !== "string") return value;
    if (!value.startsWith("data:image")) return value;

    const [header, base64Data] = value.split(",");
    if (!header || !base64Data) return value;

    const mimeMatch = header.match(/data:(image\/[a-zA-Z0-9.+-]+);base64/);
    const mimeType = mimeMatch?.[1] ?? "image/png";
    const extension = mimeType === "image/jpeg" ? "jpg" : "png";
    const buffer = Buffer.from(base64Data, "base64");

    const filename = `fetchdesk/signatures/${filePrefix}-${Date.now()}.${extension}`;
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: mimeType,
    });

    return blob.url;
  };

  const studentNumber = formData.get("student_number");
  const officerSignature = await uploadSignatureIfNeeded(
    formData.get("officer_signature"),
    `officer-${studentNumber ?? "unknown"}`,
  );
  const studentSignature = await uploadSignatureIfNeeded(
    formData.get("student_signature"),
    `student-${studentNumber ?? "unknown"}`,
  );
  const returnOfficerSignature = await uploadSignatureIfNeeded(
    formData.get("return_officer_signature"),
    `return-officer-${studentNumber ?? "unknown"}`,
  );
  const returnStudentSignature = await uploadSignatureIfNeeded(
    formData.get("return_student_signature"),
    `return-student-${studentNumber ?? "unknown"}`,
  );

  const updateData: Record<string, FormDataEntryValue | null> = {};

  const setIfPresent = (key: string) => {
    if (formData.has(key)) {
      updateData[key] = formData.get(key);
    }
  };

  setIfPresent("student_name");
  setIfPresent("student_number");
  setIfPresent("cys");
  setIfPresent("contact_details");
  setIfPresent("transaction_type");
  setIfPresent("print_type");
  setIfPresent("page_count");
  setIfPresent("bw_page_count");
  setIfPresent("colored_page_count");
  setIfPresent("free_pages_availed");
  setIfPresent("rental_item");
  setIfPresent("rental_items");
  setIfPresent("rental_time");
  setIfPresent("return_time");
  setIfPresent("penalty_amount");
  setIfPresent("status");
  setIfPresent("calculated_price");
  setIfPresent("notes");
  setIfPresent("date");

  if (officerSignature) updateData.officer_signature = officerSignature;
  if (studentSignature) updateData.student_signature = studentSignature;
  if (returnOfficerSignature)
    updateData.return_officer_signature = returnOfficerSignature;
  if (returnStudentSignature)
    updateData.return_student_signature = returnStudentSignature;

  const { data, error } = await supabase
    .from("fetchdesk")
    .update(updateData)
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined)
    .select();

  return error
    ? { success: false, message: error?.message }
    : { success: true };
  // console.log(data)
}

export async function deleteFetchDeskPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const id = formData.get("id");

  const { error } = await supabase
    .from("fetchdesk")
    .delete()
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function getAttendance(studentNumber: string, date?: string) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const baseDate = new Date();
  const day = baseDate.getDate();

  let { data: documents } = await supabase
    .from("attendance_users")
    .select("*", { count: "exact", head: false })
    .eq("student_id", studentNumber);

  if (!documents || documents.length === 0) {
    // console.log("No user found with student number:", studentNumber);
    return { success: true, data: documents, count: 0, type: "userAccount" };
  }

  let { data: attendance, count } = await supabase
    .from("attendance")
    .select("*", { count: "exact", head: false })
    .or('student_id.eq.' + studentNumber + ',student_name.eq.' + studentNumber)
    .eq('date', date ? date : baseDate.toISOString().split("T")[0]);

  // console.log("Attendance Records:", attendance);

  return { success: true, data: attendance, userData: documents[0], count: count || 0, type: "attendanceRecords" };
}

export async function createAttendanceUserPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const student_name = formData.get("student_name");
  const student_number = formData.get("student_number");
  const role = formData.get("role");

  // console.log(student_name, student_number, role);
  const { data, error } = await supabase
    .from("attendance_users")
    .insert([
      {
        student_name: student_name,
        student_id: student_number,
        role: role,
      },
    ])
    .select();

  // console.log(data, error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function createAttendancePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const extractDataUrl = (value: FormDataEntryValue | null) => {
    if (typeof value !== "string") return null;
    if (!value.startsWith("data:image")) return null;
    return value;
  };

  const getFileExtension = (mimeType: string) => {
    if (mimeType === "image/jpeg") return "jpg";
    if (mimeType === "image/png") return "png";
    if (mimeType === "image/webp") return "webp";
    return "png";
  };

  const uploadSignatureIfNeeded = async (
    value: FormDataEntryValue | null,
    filePrefix: string,
  ) => {
    const dataUrl = extractDataUrl(value);
    if (!dataUrl) return value;

    const [header, base64Data] = dataUrl.split(",");
    if (!header || !base64Data) return value;

    const mimeMatch = header.match(/data:(image\/[a-zA-Z0-9.+-]+);base64/);
    const mimeType = mimeMatch?.[1] ?? "image/png";
    const extension = getFileExtension(mimeType);
    const buffer = Buffer.from(base64Data, "base64");
    const filename = `attendance/signatures/${filePrefix}-${Date.now()}.${extension}`;
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: mimeType,
    });
    return blob.url;
  };


  const student_name = formData.get("student_name");
  const student_id = formData.get("student_id");
  const time_in = formData.get("time_in");
  const additional = formData.get("additional");
  const signature = formData.get("signature");
  const role = formData.get("role");


  const signatureUrl = await uploadSignatureIfNeeded(
    signature,
    `attendance-${student_id ?? "unknown"}`,
  );

  const { data, error } = await supabase
    .from("attendance")
    .insert([
      {
        student_name: student_name,
        student_id: student_id,
        date: new Date().toISOString().split("T")[0],
        time_in: time_in,
        additional: additional,
        type: role,
        time_in_signature: signatureUrl,
      },
    ])
    .select();

  // console.log(data, error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };
}

export async function updateAttendancePOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
  );

  const extractDataUrl = (value: FormDataEntryValue | null) => {
    if (typeof value !== "string") return null;
    if (!value.startsWith("data:image")) return null;
    return value;
  };

  const getFileExtension = (mimeType: string) => {
    if (mimeType === "image/jpeg") return "jpg";
    if (mimeType === "image/png") return "png";
    if (mimeType === "image/webp") return "webp";
    return "png";
  };

  const uploadSignatureIfNeeded = async (
    value: FormDataEntryValue | null,
    filePrefix: string,
  ) => {
    const dataUrl = extractDataUrl(value);
    if (!dataUrl) return value;

    const [header, base64Data] = dataUrl.split(",");
    if (!header || !base64Data) return value;

    const mimeMatch = header.match(/data:(image\/[a-zA-Z0-9.+-]+);base64/);
    const mimeType = mimeMatch?.[1] ?? "image/png";
    const extension = getFileExtension(mimeType);
    const buffer = Buffer.from(base64Data, "base64");
    const filename = `attendance/signatures/${filePrefix}-${Date.now()}.${extension}`;
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: mimeType,
    });
    return blob.url;
  };

  const document_id = formData.get("document_id");
  const student_name = formData.get("student_name");
  const student_id = formData.get("student_id");
  const time_out = formData.get("time_out");
  const signature = formData.get("signature");


  const signatureUrl = await uploadSignatureIfNeeded(
    signature,
    `attendance-${student_id ?? "unknown"}`,
  );

  const { data, error } = await supabase
    .from("attendance")
    .update([
      {
        student_name: student_name,
        student_id: student_id,
        time_out: time_out,
        time_out_signature: signatureUrl,
        updated_at: new Date().toISOString(),
      },
    ])
    .eq("id", document_id !== null ? parseInt(document_id as string, 10) : undefined)
    .select();

  // console.log(data, error);
  return error
    ? { success: false, message: error?.message }
    : { success: true };
}