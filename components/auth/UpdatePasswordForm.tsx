"use client"

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";


const formSchema = z.object({
    password: z.string().min(8),
});


export default function UpdatePasswordForm() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { error } = await supabase.auth.updateUser({
            password: values.password,
        });

        if (error) {
            console.error(error.message);
        }
        else {
            console.log("Successfully updated password");
            toast({
                title: "Updated password!",
                description: "You can now sign in with your new password."
            });
            router.push('/');
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>Create a new password for your account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form id="update-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button form="update-password-form" type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
