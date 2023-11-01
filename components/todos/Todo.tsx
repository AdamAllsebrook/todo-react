"use client"

import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import EditableText from "@/components/EditableText"
import {
    Card,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

type Todo = {
    id: string
    title: string
    description: string
    completed: boolean
}

export default function Todo(
    { todo, autofocusTitle = false, onCheck, onTitle, onTitleBlur, onDescription, showDelete = true, onDelete }:
        {
            todo: Todo,
            autofocusTitle?: boolean,
            onCheck: () => void,
            onTitle: (text: string) => void,
            onTitleBlur?: () => void,
            onDescription: (text: string) => void,
            showDelete?: boolean,
            onDelete?: () => void,
        }) {

    return (
        <Card className="w-full max-w-3xl flex p-4">
            <Checkbox id={`check-${todo.id}`} className="my-2 mr-2"
                checked={todo.completed} onClick={onCheck} />
            <label htmlFor={`check-${todo.id}`} className="hidden">{todo.title}</label>
            <div className="flex flex-col items-start w-full space-y-2">
                <div className="flex w-full justify-between">
                    <EditableText text={todo.title}
                        textClass={cn("text-lg break-all whitespace-normal text-left", todo.completed && "line-through text-gray-500")}
                        onSubmit={onTitle} autofocus={autofocusTitle} onBlur={onTitleBlur} />
                    {showDelete &&
                        <Button variant="ghost" className="" size="sm" onClick={onDelete}>
                            <Trash className="w-4 h-4 text-gray-500" />
                        </Button>
                    }
                </div>
                <EditableText text={todo.description} placeholder="Add a description..."
                    textClass={cn("text-md text-gray-500 break-all whitespace-normal text-left", todo.completed && "line-through")}
                    onSubmit={onDescription} />
            </div>
        </Card>
    )
}
