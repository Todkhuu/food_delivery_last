import { Dispatch } from "react";
import { FormPassword } from "./FormPassword";
import { ButtonLink } from "@/components/auth";
import { BackButton } from "@/components/button";
import { DynamicCardHeader } from "@/components/card";

type firstStepProps = {
  currentStep: number;
  setCurrentStep: Dispatch<number>;
  email: string;
};

export const SignUpPassword = ({
  currentStep,
  setCurrentStep,
  email,
}: firstStepProps) => {
  const handleClick = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-[416px]">
      <BackButton handleClick={handleClick} />
      <DynamicCardHeader
        title="Create a strong password"
        description="Create a strong password with letters, numbers."
      />
      <FormPassword email={email} />
      <ButtonLink text="Log in" url="/login" lorem="Already have an account?" />
    </div>
  );
};
