import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';

export default function SignInButton() {
    return (
        <Link className={buttonVariants({ variant: "outline" })} href="/auth/sign-in">Sign In</Link>
    )
}
