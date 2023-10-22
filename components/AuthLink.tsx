import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { cookies } from 'next/headers';
import UserDropdown from './UserDropdown';
import { buttonVariants } from './ui/button';

export default async function AuthLink() {
    const supabase = createServerComponentClient({ cookies });

    const { data: { user: user } } = await supabase.auth.getUser();

    if (user !== null) {
        return (
            <UserDropdown name={user.email ?? user.phone ?? "User"} />
        );
    }
    else {
        return <Link className={buttonVariants({ variant: "default" })} href="/auth/sign-in">Sign In</Link>;
    }
}
