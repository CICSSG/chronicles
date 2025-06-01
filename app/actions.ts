'use server';
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { imgurUpload } from "@/utils/imgur-upload";

export async function createNewDocument(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const title = formData.get("title")
  const date = formData.get("date")
  const documentType = formData.get("document_type")
  const description = formData.get("description")
  const author = formData.get("author")
  const fileLink = formData.get("file_link")
  const image = formData.get("image")
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  
  const { data, error } = await supabase
    .from('documents')
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
    .select()

  console.log(error?.message)
  // console.log(data)      
}

export async function editDocumentPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const id = formData.get("id")
  const title = formData.get("title")
  const date = formData.get("date")
  const documentType = formData.get("document_type")
  const description = formData.get("description")
  const author = formData.get("author")
  const fileLink = formData.get("file_link")
  // const image = formData.get("image")
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)
  const { data, error } = await supabase
  .from('documents')
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
  .eq('id', id !== null ? parseInt(id as string, 10) : undefined)
  .select()

  console.log(error?.message)
  // console.log(data)      
}

export async function deleteDocumentPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );
  
  const id = formData.get("id")
  
  const { error } = await supabase
  .from('documents')
  .delete()
  .eq('id', id !== null ? parseInt(id as string, 10) : undefined)

  console.log(error?.message)
}

export async function createAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const title = formData.get("title")
  const date = formData.get("date")
  const description = formData.get("description")
  const postLink = formData.get("post_link")
  const image = formData.get("image")
  
  const { error } = await supabase
    .from('announcements')
    .insert([
      { 
        title: title,
        date: date,
        description: description,
        link: postLink,
        image: image,
      },
    ])
    .select()

  console.log(error?.message)
  // console.log(data)      
}

export async function editAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const id = formData.get("id")
  const title = formData.get("title")
  const date = formData.get("date")
  const description = formData.get("description")
  const postLink = formData.get("post_link")
  const image = formData.get("image")
  // const externalLinksRaw = formData.get("external_links");
  // const externalLinks = externalLinksRaw ? JSON.parse(externalLinksRaw as string) : [];

  // console.log(id, title, date, documentType, description, author, postLink, image, externalLinks)


  if(!image) {
const { data, error } = await supabase
  .from('announcements')
  .update({ 
        title: title,
        date: date,
        description: description,
        link: postLink,
        // external_links: externalLinks
      })
  .eq('id', id !== null ? parseInt(id as string, 10) : undefined)
  .select()

  console.log(error?.message)

  } else {
    const { data, error } = await supabase
  .from('announcements')
  .update({ 
        title: title,
        date: date,
        description: description,
        link: postLink,
        image: image,
        // external_links: externalLinks
      })
  .eq('id', id !== null ? parseInt(id as string, 10) : undefined)
  .select()

  console.log(error?.message)
  }
}


export async function deleteAnnouncementPOST(formData: FormData) {
  const { getToken } = await auth();
  const accessToken = await getToken({ template: "supabase" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );
  
  const id = formData.get("id")
  
  const { error } = await supabase
  .from('announcements')
  .delete()
  .eq('id', id !== null ? parseInt(id as string, 10) : undefined)

  console.log(error?.message)
}