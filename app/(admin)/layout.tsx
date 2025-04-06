import AdminProfile from "@/components/admin/profile";
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
      <AdminSidebar>
        <AdminProfile />
      </AdminSidebar>

      <div className="w-full">
        <div className="float-right mr-8 mt-4"><SignOut /></div>
        {children}

        {/* <div className="toast toast-end">
          <div className="alert alert-info">
            <span>New mail arrived.</span>
          </div>
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
