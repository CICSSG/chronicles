import AdminSidebar from "@/components/admin/sidebar";
import SignOut from "@/components/admin/signout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex">
      <AdminSidebar />
      
      <div className="w-full">
        <div className="float-right mr-8 mt-4"><SignOut/></div>
        {children}
      </div>
    </div>
  );
}
