import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';

export default function SignUpButton() {
    return (

        <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-up">Sign Up</Link>
    )
}
