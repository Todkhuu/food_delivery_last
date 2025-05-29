"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormLogin } from "./FormLogin";
import { BackButton } from "@/components/button";
import { DynamicCardHeader } from "@/components/card";
import { ButtonLink } from "@/components/auth";

export const Login = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div>
      <BackButton handleClick={handleClick} />
      <DynamicCardHeader
        title={"Log in"}
        description={"Log in to enjoy your favorite dishes."}
      />
      <div className="w-[416px] flex flex-col gap-[16px]">
        <FormLogin />
        <Link href={"/forget-password"}>
          <Button variant={"link"} className="flex justify-start p-0">
            <p className="text-[14px] text-[#71717a]">Forgot password ?</p>
          </Button>
        </Link>
      </div>
      <ButtonLink
        text="Sign up"
        url="/sign-up"
        lorem="Don’t have an account?"
      />
    </div>
  );
};
