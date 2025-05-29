import { Button } from "@/components/ui/button";

export function NextButton({
  text,
  onClick,
}: {
  text?: string;
  onClick?: any;
}) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      variant={"secondary"}
      className="w-[100%] mt-[24px]"
    >
      {text}
    </Button>
  );
}
