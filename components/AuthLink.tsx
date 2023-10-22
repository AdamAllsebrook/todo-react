import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserDropdown from './UserDropdown';
import SignInButton from './auth/SignInButton';
import SignUpButton from './auth/SignUpButton';

export default async function AuthLink() {
    const supabase = createServerComponentClient({ cookies });

    const { data: { user: user } } = await supabase.auth.getUser();

    if (user !== null) {
        return (
            <UserDropdown user={user} />
        );
    }
    else {
        return (
            <div className="flex space-x-2">
                <SignInButton />
                <SignUpButton />
            </div>
        )
    }
}
