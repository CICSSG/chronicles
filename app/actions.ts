"use server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

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
          contact_info: contact,
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
          contact_info: contact,
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
  directorate.push({ name, position, image, responsibilities, contact_info });

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
    item.name === id_name ? { name, position, image, responsibilities, contact_info } : item,
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
  const image = formData.get("image");const responsibilitiesRaw = formData.get("responsibilities_data");
  const contactRaw = formData.get("contact_data");
  const contact_info =
    typeof contactRaw === "string" ? JSON.parse(contactRaw) : contactRaw;

  const { data } = await supabase
    .from("slate")
    .select("legislative")
    .eq("id", id !== null ? parseInt(id as string, 10) : undefined);

  const legislative = data?.[0]?.legislative || [];
  legislative.push({ name, image, contact_info });

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
    item.name === id_name ? { name, image, contact_info } : item,
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

  console.log(timer_visibility);
  console.log(button_visibility);
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
      })
      .select();

    console.log(error);
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

  const { data, error } = await supabase
    .from("urgent_announcement")
    .update({
      announcement: announcement,
      date: date != "" ? date : null,
      button_text: button_text,
      button_link: button_link,
      time_visibility: timer_visibility,
      button_visibility: button_visibility,
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
