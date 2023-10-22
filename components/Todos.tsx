"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import React, { useState } from "react"
import { Database } from "@/types/supabase"
import Todo from "./Todo"


export default function Todos() {
    const supabase = createClientComponentClient<Database>()
    const [todos, setTodos] = useState<Database['public']['Tables']['todos']['Row'][]>([])

    const getTodos = async () => {
        let { data: todos, error } = await supabase
            .from('todos')
            .select('*')
        if (error || !todos) {
            console.log('error', error)
        } else {
            setTodos(todos)
        }
    }
    getTodos()

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-4">My to-do list</h1>
            <ul>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}
