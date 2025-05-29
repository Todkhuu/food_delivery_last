"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ResetEmail } from "./ResetEmail";
import { ResendEmail } from "./ResendEmail";
import axios, { AxiosError } from "axios";
import { CircleCheck, CircleX } from "lucide-react";

export const ForgetPassword = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const FormSteps = [ResetEmail, ResendEmail][currentStep];

  const resetPassword = async (email: string) => {
    try {
      const res = await axios.post(`/api/auth/forgot-password`, {
        email,
      });

      if (res.data) {
        toast(res.data.message, {
          icon: <CircleCheck size={18} className="text-green-500" />,
        });
        setCurrentStep(1);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast(error.response?.data.message || "Unknown error occurred", {
        icon: <CircleX size={18} className="text-red-500" />,
      });
    }
  };

  return (
    <FormSteps
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      resetPassword={resetPassword}
      email={email}
      setEmail={setEmail}
    />
  );
};
