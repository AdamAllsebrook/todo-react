import AuthLink from '@/components/auth/AuthLink'
import Nav from '@/components/Nav'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import TodosApp from '@/components/todos/TodosApp';

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
            <TodosApp />
        </main>
    )
}
