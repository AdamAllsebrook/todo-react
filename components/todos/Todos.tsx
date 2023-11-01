"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import { Database } from "@/types/supabase"
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
        <div className="p-2">
            <h1 className="text-3xl my-12 lg:text-5xl font-semibold lg:my-24">My To-Do List</h1>
            <div className="space-y-4 lg:mr-[20vw] w-[95vw] lg:w-[768px]">
                {!todos ? null : todos.map((todo) => (
                    <EditableTodo key={todo.id} todo={todo} />
                ))}
                <AddTodo />
            </div>
        </div>
    )
}
