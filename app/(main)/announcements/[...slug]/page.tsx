export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div className="flex flex-col w-10/12 lg:w-8/12 my-10 gap-8">My Post: {slug}</div>
}