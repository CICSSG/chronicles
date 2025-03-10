import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import React from 'react'

const AdminOfficers = async () => {
  const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/sign-in");
    }

  return (
    <div>AdminOfficers</div>
  )
}

export default AdminOfficers