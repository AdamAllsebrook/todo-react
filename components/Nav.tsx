import React from 'react';
import AuthLink from './AuthLink';
import { CheckSquare } from 'lucide-react';

export default async function Nav() {
    return (
        <nav className="flex w-full justify-between border-b p-2">
            <div className="my-auto flex">
                <CheckSquare className="w-6 h-6 mr-2 my-auto" />
                <h1 className="text-2xl">Todos!</h1>
            </div>
            <AuthLink />
        </nav>
    )
}
