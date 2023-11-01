"use client"

import { Plus } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"

export default function AddTodo() {
    return (
        <li className="flex items-center">
            <Button variant="ghost">
                <Plus className="w-4 h-4 mr-2" />
                New todo
            </Button>
        </li>
    )
}
