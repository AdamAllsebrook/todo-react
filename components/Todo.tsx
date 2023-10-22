"use client"

import React from "react"
import { Database } from "@/types/supabase"
import { Checkbox } from "./ui/checkbox"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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
        <div className="flex px-2" >
            <Checkbox id={`check-${todo.id}`} onClick={() => {
                mutate({ completed: !todo.completed })
            }} checked={isPending ? variables.completed : todo.completed} className="my-auto mr-2" />
            <label htmlFor={`check-${todo.id}`} className="my-auto">{todo.title}</label>
        </div>
    )
}
