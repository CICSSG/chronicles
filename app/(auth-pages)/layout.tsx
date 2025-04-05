export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-10/12 lg:w-8/12 my-10 gap-8 w-fit items-center">{children}</div>
  );
}
