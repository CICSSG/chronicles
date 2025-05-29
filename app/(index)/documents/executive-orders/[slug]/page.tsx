export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
   const { slug } = await params;
  const id = typeof slug === "string" ? parseInt(slug) : 0;

  return (
    <>
    
    </>
  ) 
}