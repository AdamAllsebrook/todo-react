"use client"

import React from "react"
import { Database } from "@/types/supabase"
import { Checkbox } from "./ui/checkbox"

export default function Todo({ todo }: { todo: Database['public']['Tables']['todos']['Row'] }) {
    return (
        <div className="flex px-2">
            <Checkbox checked={todo.completed} className="my-auto mr-2" />
            <p> {todo.title} </p>
        </div>
    )
}
