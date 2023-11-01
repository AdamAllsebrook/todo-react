"use client"

import React from "react"
import { Database } from "@/types/supabase"
import { Checkbox } from "./ui/checkbox"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "./ui/button"
import EditableText from "./EditableText"

export default function Todo({ todo }: { todo: Database['public']['Tables']['todos']['Row'] }) {
    const supabase = createClientComponentClient<Database>()
    const queryClient = useQueryClient()

    const updateTodo = async (updateTodo: Database['public']['Tables']['todos']['Update']) => {
        return supabase
            .from('todos')
            .update(updateTodo)
            .eq('id', todo.id)
            .then(({ error }) => {
                if (error) {
                    console.log('error', error)
                    throw new Error('Error updating todo')
                }
            })
    }

    const { mutate, variables, isPending } = useMutation({
        mutationFn: updateTodo,
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    return (
        <div className="flex">
            <Button variant="ghost" size="sm" onClick={() => {
                mutate({ completed: !todo.completed })
            }} >
                <Checkbox id={`check-${todo.id}`} checked={isPending ? variables.completed : todo.completed} />
                <label htmlFor={`check-${todo.id}`} className="hidden">{todo.title}</label>
            </Button>
            <div className="flex flex-col items-start">
                <EditableText text={todo.title} />
                <Button variant="ghost" size="sm" onClick={() => { }} >
                    <span className="text-sm text-gray-500">
                        {todo.description}
                    </span>
                </Button>
            </div>
        </div>
    )
}
