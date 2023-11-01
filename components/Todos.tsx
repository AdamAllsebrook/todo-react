"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import { Database } from "@/types/supabase"
import Todo from "./Todo"
import { useQuery } from "@tanstack/react-query"
import AddTodo from "./AddTodo"
import EditableTodo from "./EditableTodo"


export default function Todos() {
    const supabase = createClientComponentClient<Database>()

    const getTodos = async () => {
        return supabase
            .from('todos')
            .select('*')
            .order('created_at')
            .then(({ data: todos, error }) => {
                if (error || !todos) {
                    console.log('error', error)
                    throw new Error('Error fetching todos')
                } else {
                    return todos
                }
            })
    }

    const { data: todos } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-4">My to-do list</h1>
            <ul className="space-y-4">
                {!todos ? null : todos.map((todo) => (
                    <EditableTodo key={todo.id} todo={todo} />
                ))}
                <AddTodo />
            </ul>
        </div>
    )
}
