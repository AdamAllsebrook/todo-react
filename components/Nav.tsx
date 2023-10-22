import React from 'react';
import AuthLink from './AuthLink';

export default async function Nav() {
    return (
        <nav className="flex w-full justify-between border-b p-2">
            <h1 className="text-2xl my-auto">Todos!</h1>
            <AuthLink />
        </nav>
    )
}
