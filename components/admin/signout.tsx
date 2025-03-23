import React from "react";
import {
    FiLogOut
} from "react-icons/fi";
import { createClient } from "@/utils/supabase/server";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { signOutAction } from "@/app/actions";

const SignOut = async () => {
    return (
        <form action={signOutAction}>
            <Button type="submit" variant={"outline"}>
                Sign out
            </Button>
        </form>
    )
}

export default SignOut