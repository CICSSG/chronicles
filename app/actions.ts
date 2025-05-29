"use server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function createNewDocument(formData: FormData) {
  const title = formData.get("title")
  const date = formData.get("date")
  const documentType = formData.get("document_type")
  const description = formData.get("description")
  const author = formData.get("author")
  const postLink = formData.get("post_link")
  const image = formData.get("image")
  // const externalLinks = formData.get("external_links")

  
  const { data, error } = await supabase
    .from('documents')
    .insert([
      { 
        title: title,
        date: date,
        document_type: documentType,
        description: description,
        author: author,
        link: postLink,
        image: image,
        // external_links: externalLinks
      },
    ])
    .select()

  console.log(error?.message)
      
}