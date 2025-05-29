import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DynamicCardHeaderProps = {
  title: string;
  description?: string | React.ReactNode;
};

export const DynamicCardHeader = ({
  title,
  description,
}: DynamicCardHeaderProps) => {
  return (
    <CardHeader className="p-0">
      <CardTitle className="text-[24px] font-semibold mt-[24px]">
        {title}
      </CardTitle>
      <CardDescription className="text-[16px] text-[#71717a] mb-[24px]">
        {description}
      </CardDescription>
    </CardHeader>
  );
};
