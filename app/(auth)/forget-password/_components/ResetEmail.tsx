"use client";
import { Dispatch } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BackButton, NextButton } from "@/components/button";
import { DynamicCardHeader } from "@/components/card";
import { ButtonLink } from "@/components/auth";

type firstStepProps = {
  resetPassword: (email: string) => void;
  setEmail: Dispatch<string>;
};

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const ResetEmail = ({ resetPassword, setEmail }: firstStepProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetPassword(values.email);
    setEmail(values.email);
  }

  return (
    <div>
      <BackButton handleClick={handleClick} />
      <DynamicCardHeader
        title="Reset your password"
        description="Enter your email to receive a password reset link."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-[420px]"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <NextButton text={"Send link"} />
        </form>
      </Form>
      <ButtonLink
        text="Sign up"
        url="/sign-up"
        lorem="Don’t have an account?"
      />
    </div>
  );
};
