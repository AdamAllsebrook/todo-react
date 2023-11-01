"use client"

import React, { useEffect, useState } from "react"
import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Todo from "./Todo"

export default function EditableTodo({ todo }: { todo: Database['public']['Tables']['todos']['Row'] }) {
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

    const deleteTodo = async () => {
        return supabase
            .from('todos')
            .delete()
            .eq('id', todo.id)
            .then(({ error }) => {
                if (error) {
                    console.log('error', error)
                    throw new Error('Error deleting todo')
                }
            })
    }

    const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
        mutationFn: deleteTodo,
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const [showCompleted, setShowCompleted] = useState(todo.completed)
    useEffect(() => {
        setShowCompleted((isPending ? variables.completed : todo.completed) as boolean)
    }, [todo.completed, isPending])

    return (
        deleteIsPending ? null :
            <Todo todo={{
                id: todo.id,
                title: todo.title,
                description: todo.description ?? "",
                completed: showCompleted,
            }}
                onCheck={() => {
                    mutate({ completed: !todo.completed })
                }}
                onTitle={(text) => {
                    mutate({ title: text })
                }}
                onDescription={(text) => {
                    mutate({ description: text })
                }}
                onDelete={() => {
                    deleteMutate()
                }}
            />
    )
}
