"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "../_context/UserContext";
import { HeaderLeft } from "@/components/home/HeaderLeft";
import { HeaderLogOut } from "@/components/home/HeaderLogOut";
import { HeaderSheet } from "@/components/home/HeaderSheet";
import { HeaderAddress } from "@/components/home/HeaderAddress";

export const Header = () => {
  const { user } = useUser();
  return (
    <div className="m-auto h-[68px] bg-[#18181b] flex items-center">
      <div className="w-[1264px] m-auto flex items-center justify-between">
        <HeaderLeft />
        {user ? (
          <div className="flex items-center gap-[12px]">
            <HeaderAddress />
            <HeaderSheet />
            <HeaderLogOut user={user} />
          </div>
        ) : (
          <div className="flex gap-[13px]">
            <Link href={"/sign-up"}>
              <Button className="text-[14px] py-[8px] px-[12px] bg-[#f4f4f5] rounded-full text-secondary-foreground">
                Sign up
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button className="text-[14px] py-[8px] px-[12px] bg-[#ef4444] rounded-full text-secondary">
                Log in
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
