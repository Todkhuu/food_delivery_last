"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { CircleCheck, MailWarning } from "lucide-react";
import { DynamicCardHeader } from "@/components/card";
import { PasswordCheckbox } from "@/components/auth/PasswordCheckBox";
import { NextButton } from "@/components/button";

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

export const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  if (!id) {
    return (
      <div>
        <MailWarning />
      </div>
    );
  }

  const createNewPassword = async (password: string, token: string) => {
    const res = await axios.post("/api/auth/reset-password", {
      password,
      token,
    });
    toast(res.data.message, {
      icon: <CircleCheck size={18} className="text-green-500" />,
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    createNewPassword(values.password, id!);
    router.push("/sign-in");
  }
  return (
    <div className="w-[416px]">
      <DynamicCardHeader
        title="Create a new password"
        description="Set a new password with a combination of letters and numbers for better
        security."
      />
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
    </div>
  );
};
