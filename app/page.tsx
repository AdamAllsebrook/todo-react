import AuthLink from '@/components/AuthLink'
import Nav from '@/components/Nav'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Todos from '@/components/Todos';

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });

    const { data: { user: user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/sign-up')
    }

    return (
        <main className="w-full flex min-h-screen flex-col">
            <Nav>
                <AuthLink />
            </Nav>
            <Todos />
        </main>
    )
}
