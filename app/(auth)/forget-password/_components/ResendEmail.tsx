import { BackButton, NextButton } from "@/components/button";
import { DynamicCardHeader } from "@/components/card";
import { Dispatch } from "react";

type resendProps = {
  currentStep: number;
  setCurrentStep: Dispatch<number>;
  resetPassword: (email: string) => void;
  email: string;
};

export const ResendEmail = ({
  currentStep,
  setCurrentStep,
  resetPassword,
  email,
}: resendProps) => {
  const handleClick = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-[420px]">
      <BackButton handleClick={handleClick} />
      <DynamicCardHeader
        title="Please verify Your Email"
        description={
          <>
            We just sent an email to{" "}
            <strong style={{ color: "black" }}>{email}</strong>. Click the link
            in the email to verify your account.
          </>
        }
      />
      <NextButton onClick={() => resetPassword(email)} text={"Resend email"} />
    </div>
  );
};
