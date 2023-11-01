"use client"

import React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, LogOut, RotateCcw, User } from "lucide-react"
import Link from "next/link"


export default function UserDropdown({ user }: { user: any }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    <p className="hidden md:block">{user.email}</p>
                    <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="p-0">
                        <Button asChild variant="ghost" size="sm" className="w-full">
                            <Link href="/auth/update-password">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Update Password
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0">
                        <form method="POST" action="/auth/sign-out" className="w-full">
                            <Button type="submit" variant="ghost" size="sm" className="w-full justify-start">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
