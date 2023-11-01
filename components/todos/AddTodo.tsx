"use client"

import { Plus } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import NewTodo from "./NewTodo"

export default function AddTodo() {
    const [isEditing, setIsEditing] = useState(false)

    return (
        isEditing ?
            <NewTodo callback={() => setIsEditing(false)} />
            :
            <div className="flex items-center">
                <Button variant="ghost" onClick={() => setIsEditing(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New todo
                </Button >
            </div >
    )
}
