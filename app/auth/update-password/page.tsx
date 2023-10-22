import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import UpdatePasswordForm from '@/components/auth/UpdatePasswordForm';
import Nav from '@/components/Nav';
import AuthLink from '@/components/AuthLink';

export default async function UpdatePasswordPage() {
    const supabase = createServerComponentClient({ cookies });

    const { data: { session }, } = await supabase.auth.getSession();

    if (!session) {
        redirect('/auth/sign-in');
    }

    return (
        <>
            <Nav>
                <AuthLink />
            </Nav>
            <div className="flex-1 flex flex-col justify-center">
                <UpdatePasswordForm />
            </div>
        </>
    )
}
