import { Button } from "@/components/ui/button";
import Link from "next/link";

type ButtonLinkProps = {
  text: string;
  url: string;
  lorem: string;
};

export const ButtonLink = ({ text, url, lorem }: ButtonLinkProps) => {
  return (
    <div className="flex items-center justify-center mt-[24px]">
      <p className="text-[16px] text-[#71717a]">{lorem}</p>
      <Link href={`${url}`}>
        <Button variant={"link"}>
          <p className="text-[#2563EB]">{text}</p>
        </Button>
      </Link>
    </div>
  );
};
