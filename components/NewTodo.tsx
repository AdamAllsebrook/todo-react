"use client"

import React, { useContext, useEffect, useState } from "react"
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
    //     < Card className = "w-[350px] flex p-4" >
    //     <Checkbox id={`check-${todo.id}`} className="my-2 mr-2"
    //     checked={showCompleted} onClick={() => {
    //         mutate({ completed: !todo.completed })
    //     }} />
    // <label htmlFor={`check-${todo.id}`} className="hidden">{todo.title}</label>
    //     <div className="flex flex-col items-start w-full">
    //     <EditableText text={todo.title}
    // textClass={cn("text-lg break-all whitespace-normal text-left", showCompleted && "line-through text-gray-500")}
    // onSubmit={text => {
    //     mutate({ title: text })
    // }} />
    // <EditableText text={todo.description ?? ""}
    // textClass={cn("text-md text-gray-500 break-all whitespace-normal text-left", showCompleted && "line-through")}
    // onSubmit={text => {
    //     mutate({ description: text })
    // }} />
    // </div>
    //     </Card >
}
