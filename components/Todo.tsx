"use client"

import React from "react"
import { Checkbox } from "./ui/checkbox"
import EditableText from "./EditableText"
import {
    Card,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Todo = {
    id: string
    title: string
    description: string
    completed: boolean
}

export default function Todo(
    { todo, autofocusTitle = false, onCheck, onTitle, onTitleBlur, onDescription }:
        { todo: Todo, autofocusTitle?: boolean, onCheck: () => void, onTitle: (text: string) => void, onTitleBlur?: () => void, onDescription: (text: string) => void }) {

    return (
        <Card className="w-[350px] flex p-4">
            <Checkbox id={`check-${todo.id}`} className="my-2 mr-2"
                checked={todo.completed} onClick={onCheck} />
            <label htmlFor={`check-${todo.id}`} className="hidden">{todo.title}</label>
            <div className="flex flex-col items-start w-full space-y-2">
                <EditableText text={todo.title}
                    textClass={cn("text-lg break-all whitespace-normal text-left", todo.completed && "line-through text-gray-500")}
                    onSubmit={onTitle} autofocus={autofocusTitle} onBlur={onTitleBlur} />
                <EditableText text={todo.description} placeholder="Add a description..."
                    textClass={cn("text-md text-gray-500 break-all whitespace-normal text-left", todo.completed && "line-through")}
                    onSubmit={onDescription} />
            </div>
        </Card>
    )
}
