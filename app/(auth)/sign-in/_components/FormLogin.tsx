"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { PasswordCheckbox } from "@/components/auth/PasswordCheckBox";
import { NextButton } from "@/components/button";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const FormLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const logIn = async (email: string, password: string) => {
    try {
      const res = await axios.post(`/api/auth/sign-in`, {
        email,
        password,
      });
      localStorage.setItem("id", res.data.user._id);
      toast(res.data.message, {
        icon: <CircleCheck size={18} className="text-green-500" />,
      });

      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast(error.response?.data.message || "Unknown error occurred", {
        icon: <CircleX size={18} className="text-red-500" />,
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    logIn(values.email, values.password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
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
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  type={showPassword ? "text" : "password"}
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
