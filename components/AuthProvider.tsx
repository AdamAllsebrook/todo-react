'use client';

import { createContext, useEffect, useState } from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider = ({ accessToken, children }) => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            if (session?.access_token !== accessToken) {
                console.log("refreshing")
                router.refresh();
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, [accessToken, supabase, router]);

    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

