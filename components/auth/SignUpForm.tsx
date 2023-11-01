"use client"

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


function ErrorAlert({ error }: { error: string }) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    )
}

export default function SignUpForm() {
    const supabase = createClientComponentClient();

    const { toast } = useToast();
    const [alert, setAlert] = useState<React.ReactNode>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (error) {
            setAlert(<ErrorAlert error={error.message} />)
        }
        else {
            toast({
                title: "Sign up successful!",
                description: "Welcome to Todos!"
            })
        }
    }

    function handleSubmit() {
        setAlert(null)
        form.handleSubmit(onSubmit)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {alert}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your password must be at least 8 characters long.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
                <Button form="sign-up-form" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </CardFooter>
        </Card >
    )
}
