"use client"

import React, { useEffect, useState } from "react"
import { Database } from "@/types/supabase"
import { Checkbox } from "./ui/checkbox"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "./ui/button"
import EditableText from "./EditableText"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

    const [showCompleted, setShowCompleted] = useState(todo.completed)
    useEffect(() => {
        setShowCompleted((isPending ? variables.completed : todo.completed) as boolean)
    }, [todo.completed, isPending])

    return (
        <Card className="w-[350px] flex p-4">
            <Checkbox id={`check-${todo.id}`} className="my-2 mr-2"
                checked={showCompleted} onClick={() => {
                    mutate({ completed: !todo.completed })
                }} />
            <label htmlFor={`check-${todo.id}`} className="hidden">{todo.title}</label>
            <div className="flex flex-col items-start w-full">
                <EditableText text={todo.title}
                    textClass={cn("text-lg break-all whitespace-normal text-left", showCompleted && "line-through text-gray-500")}
                    onSubmit={text => {
                        mutate({ title: text })
                    }} />
                <EditableText text={todo.description ?? ""}
                    textClass={cn("text-md text-gray-500 break-all whitespace-normal text-left", showCompleted && "line-through")}
                    onSubmit={text => {
                        mutate({ description: text })
                    }} />
            </div>
        </Card>
    )
}
