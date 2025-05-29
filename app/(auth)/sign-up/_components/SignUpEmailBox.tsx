"use client";
import { Dispatch } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/button";
import { DynamicCardHeader } from "@/components/card";
import { ButtonLink } from "@/components/auth";
import { FormInput } from "./FormInput";

type firstStepProps = {
  currentStep: number;
  setCurrentStep: Dispatch<number>;
  handleEmail: Dispatch<string>;
};

export const SignUpEmail = ({
  currentStep,
  setCurrentStep,
  handleEmail,
}: firstStepProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="w-[416px]">
      <BackButton handleClick={handleClick} />
      <DynamicCardHeader
        title="Create your account"
        description="Sign up to explore your favorite dishes."
      />
      <FormInput
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleEmail={handleEmail}
      />
      <ButtonLink
        text="Log in"
        url="/sign-in"
        lorem="Already have an account?"
      />
    </div>
  );
};
