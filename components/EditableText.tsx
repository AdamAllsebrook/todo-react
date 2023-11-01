"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

export default function EditableText(
    { text, textClass = "", placeholder = "", autofocus = false, onSubmit, onBlur }:
        { text: string, textClass: string, placeholder?: string, autofocus?: boolean, onSubmit: (text: string) => void, onBlur?: () => void }) {
    const [isEditing, setIsEditing] = useState(autofocus)
    const [value, setValue] = useState(text)
    const [savedValue, setSavedValue] = useState(text)
    const inputRef = useRef<HTMLInputElement>(null)

    if (isEditing) {
        return (
            <form className="w-full" onSubmit={(e) => {
                e.preventDefault()
                setIsEditing(false)
                setSavedValue(value)
                onSubmit(value)
            }}
            >

                <Button variant="ghost" size="sm" className="focus-within:bg-gray-100 h-auto min-h-9 w-full">
                    <input type="text" ref={inputRef} className={cn("bg-transparent border-none focus:outline-none w-full", textClass)}
                        defaultValue={value} placeholder={placeholder} autoFocus={true} onBlur={() => {
                            if (onBlur) onBlur()
                            else setIsEditing(false)
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
                    {savedValue.length === 0 ? placeholder : savedValue}
                </p>
            </Button>
        )
    }
}
