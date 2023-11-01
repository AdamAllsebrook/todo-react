"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

export default function EditableText({ text }: { text: string }) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState("")
    const [width, setWidth] = useState(0)
    const span = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        setWidth(span.current?.offsetWidth || 0)
    }, [value])

    if (isEditing) {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                setIsEditing(false)
            }}
            >

                <Button variant="ghost" size="sm" className="focus-within:bg-gray-100">
                    <h2 className="text-lg">
                        <span className="absolute opacity-0" ref={span}>{value}</span>
                        <input type="text" style={{ width }} className="bg-transparent border-none focus:outline-none"
                            defaultValue={text} autoFocus={true} onBlur={() => {
                                setValue("")
                                setIsEditing(false)
                            }} onChange={(e) => setValue(e.target.value)} />
                    </h2>
                </Button>
            </form>
        )
    } else {
        return (
            <Button variant="ghost" onClick={() => {
                setIsEditing(true)
                setValue(text)
            }} size="sm">
                <h2 className="text-lg">
                    {text}
                </h2>
            </Button>
        )
    }
}
