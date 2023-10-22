import React from 'react';

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Nav from '@/components/Nav';
import AuthLink from '@/components/AuthLink';

export default async function UpdatePasswordPage() {

    return (
        <>
            <Nav>
                <AuthLink />
            </Nav>
            <div className="flex-1 flex flex-col justify-center">
                <ResetPasswordForm />
            </div>
        </>
    )
}
