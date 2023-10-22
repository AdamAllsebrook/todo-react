"use client"

import React from "react"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Todos from "./Todos"

const queryClient = new QueryClient()

export default function TodosApp() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
    )
}
