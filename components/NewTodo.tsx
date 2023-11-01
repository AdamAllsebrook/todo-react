"use client"

import React, { useContext } from "react"
import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Todo from "./Todo"
import { AuthContext } from "./AuthProvider"

export default function NewTodo({ callback }: { callback: () => void }) {
    const supabase = createClientComponentClient<Database>()
    const session = useContext(AuthContext)
    const queryClient = useQueryClient()

    const newTodo = async (newTodo: Database['public']['Tables']['todos']['Insert']) => {
        return supabase
            .from('todos')
            .insert(newTodo)
            .then(({ error }) => {
                if (error) {
                    console.log('error', error)
                    throw new Error('Error updating todo')
                }
            })
    }

    const mutation = useMutation({
        mutationFn: newTodo,
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })


    return (
        <Todo todo={{
            id: "NEW_TODO",
            title: "",
            description: " ",
            completed: false,
        }}
            autofocusTitle={true}
            onCheck={() => {
            }}
            onTitle={(text) => {
                mutation.mutate({
                    title: text,
                    description: "",
                    completed: false,
                    user_id: session?.user.id ?? "",
                })
                callback()
            }}
            onTitleBlur={callback}
            onDescription={() => {
            }}
        />
    )
}
