import React from "react"
import SignUpForm from "@/components/auth/SignUpForm";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Nav from "@/components/Nav";
import SignInButton from "@/components/auth/SignInButton";


export default async function SignIn() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <>
            <Nav>
                <SignInButton />
            </Nav>
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
                <SignUpForm />
            </div>
        </>
    )
}
