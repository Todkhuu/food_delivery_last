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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch } from "react";
import { NextButton } from "@/components/button";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type StepProps = {
  currentStep: number;
  setCurrentStep: Dispatch<number>;
  handleEmail: Dispatch<string>;
};

export const FormInput = ({
  currentStep,
  setCurrentStep,
  handleEmail,
}: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrentStep(currentStep + 1);
    handleEmail(values.email);
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
        <NextButton text={"Let's go"} />
      </form>
    </Form>
  );
};
