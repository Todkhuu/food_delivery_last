import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { UserType } from "@/types";

type Props = {
  user: UserType | null;
};

export const HeaderLogOut = ({ user }: Props) => {
  function logout() {
    localStorage.removeItem("id");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[36px] h-[36px] bg-[#ef4444] rounded-full flex items-center justify-center">
        <User size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center p-4">
        <DropdownMenuLabel>{user ? user.email : ""}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={"/sign-in"}>
            <Button
              onClick={() => logout()}
              className="rounded-full bg-[#f4f4f5] "
              variant={"ghost"}
            >
              {user ? "Sign out" : "Sign in"}
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
