"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

export default function EditableText({ text, textClass = "", onSubmit }: { text: string, textClass: string, onSubmit: (text: string) => void }) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(text)
    const [savedValue, setSavedValue] = useState(text)
    const inputRef = useRef<HTMLInputElement>(null)

    if (isEditing) {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                setIsEditing(false)
                setSavedValue(value)
                onSubmit(value)
            }}
            >

                <Button variant="ghost" size="sm" className="focus-within:bg-gray-100 h-auto min-h-9">
                    <input type="text" ref={inputRef} className={cn("bg-transparent border-none focus:outline-none", textClass)}
                        defaultValue={value} autoFocus={true} onBlur={() => {
                            setIsEditing(false)
                        }} onChange={(e) => setValue(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Escape') inputRef.current?.blur()
                        }} />
                </Button>
            </form>
        )
    } else {
        return (
            <Button variant="ghost" className="w-full justify-start h-auto min-h-9" onClick={() => {
                setIsEditing(true)
            }} size="sm">
                <p className={textClass}>
                    {savedValue}
                </p>
            </Button>
        )
    }
}
