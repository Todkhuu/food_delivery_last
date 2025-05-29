"use client";
import { useState } from "react";
import { SignUpEmail } from "./SignUpEmailBox";
import { SignUpPassword } from "./SignUpPasswordBox";

export const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [SignUpEmail, SignUpPassword][currentStep];
  const [email, setEmail] = useState("");

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  return (
    <FormSteps
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      email={email}
      handleEmail={handleEmail}
    />
  );
};
