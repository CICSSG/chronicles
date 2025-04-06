import { createClient } from "@/utils/supabase/server";
import React from 'react'

export default async function AdminProfile() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: profile } = await supabase.from("profiles").select("*").eq('id', user?.id);

    const userInfo = profile?.[0] || null;
    const userRole = userInfo?.role || "Unknown Access Type";
    const userName = userInfo?.username || "Unknown User";
    return (
        <>
            <span className="block text-xs font-semibold">
                {userName}
            </span>
            <span className="block text-xs text-slate-500">
                {userRole}
            </span>
        </>
    )
}
