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
import { useToast } from "../ui/use-toast";


const formSchema = z.object({
    email: z.string().email(),
});



export default function ResetPasswordForm() {
    const supabase = createClientComponentClient();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { error } = await supabase.auth.resetPasswordForEmail(
            values.email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });

        if (error) {
            console.error(error.message);
        }
        else {
            toast({
                title: "Password reset email sent",
                description: "Check your email for a link to reset your password"
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter your email to receive a reset password link</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button form="reset-password-form" type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Submit
                </Button>
            </CardFooter>
        </Card >
    )
}
