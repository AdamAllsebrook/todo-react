import React from "react"
import SignInForm from "@/components/auth/SignInForm"
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Nav from "@/components/Nav";
import SignUpButton from "@/components/auth/SignUpButton";


export default async function SignIn() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <>
            <Nav>
                <SignUpButton />
            </Nav>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
                <SignInForm />
            </div>
        </>
    )
}
