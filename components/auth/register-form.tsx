"use client";

import { useForm } from "react-hook-form"
import * as z from 'zod';
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/auth/form-alert";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export const RegisterForm = () => {
  const [variant, setVariant] = useState<"success" | "destructive" | undefined>(undefined);
  const [statelabel, setStatelabel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setVariant(undefined);
    setStatelabel("");
    setIsLoading(true);
    const response = await axios.post("/api/auth/register", values);
    if (response.data.ok) {
      setVariant("success");
      setStatelabel(response.data.message);
    } else {
      setVariant("destructive");
      setStatelabel(response.data.message);
    }
    setIsLoading(false);
  }
  
  return (
    <FormWrapper
      title="Register"
      description="Create a new account"
    >
      <Form {...form}>
        <form className="space-y-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Input 
                  {...field}
                  placeholder="Username"  
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input 
                  {...field}
                  placeholder="youremail@example.com"  
                  autoComplete="email"
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input 
                  {...field}
                  type="password"
                  placeholder="********"  
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormAlert 
            label={statelabel}
            variant={variant}
          />
          <Button 
            className="w-full" 
            type="submit"
            disabled={isLoading}
          >
            Create an account
          </Button>
        </form>
        <div className="flex w-full items-center space-x-4 my-3">
          <div className="flex-grow h-[1px] bg-muted-foreground/50"></div>
          <p className="text-xs">or</p>
          <div className="flex-grow h-[1px] bg-muted-foreground/50"></div>
        </div>
        <Button 
          className="w-full" 
          variant="outline" 
          asChild
          disabled={isLoading}
        >
          <Link href="/login">Login</Link>
        </Button>
      </Form>
    </FormWrapper>
  )
}