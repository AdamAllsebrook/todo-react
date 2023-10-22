import React from 'react';
import { CheckSquare } from 'lucide-react';
import Link from 'next/link';

export default async function Nav({ children }: { children?: React.ReactNode }) {
    return (
        <nav className="flex w-full justify-between border-b p-2">
            <div className="my-auto flex">
                <CheckSquare className="w-6 h-6 mr-2 my-auto" />
                <Link href="/" className="text-2xl">Todos!</Link>
            </div>
            {children}
        </nav>
    )
}
