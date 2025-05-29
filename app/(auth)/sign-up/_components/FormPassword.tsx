"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { NextButton } from "@/components/button";
import { PasswordCheckbox } from "@/components/auth/PasswordCheckBox";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
  })
  .superRefine(({ password, confirm }, ctx) => {
    if (password !== confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirm"],
      });
    }
  });

type FormShowPassword = {
  email: string;
};

export const FormPassword = ({ email }: FormShowPassword) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const createUser = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/auth/sign-up", { email, password });
      toast.success(res.data.message);
      router.push("/sign-in");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error response:", error.response);
        toast.error(error.response.data.message || "Unknown error");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser(email, values.password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordCheckbox
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <NextButton text={"Let's go"} />
      </form>
    </Form>
  );
};
