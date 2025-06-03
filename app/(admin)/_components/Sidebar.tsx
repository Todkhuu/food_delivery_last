"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Truck } from "lucide-react";
import { useState } from "react";
import { NomNomLogo } from "@/components/icons";

export type SideType = {
  icon: any;
  text: string;
};

const sidebars = [
  {
    icon: <LayoutDashboard />,
    text: "Food menu",
  },
  {
    icon: <Truck />,
    text: "Orders",
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const [value, setValue] = useState("Food menu");

  const handleToggleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue === "Food menu") {
      router.push("/foodmenu");
    } else if (newValue === "Orders") {
      router.push("/orders");
    }
  };

  return (
    <div className="min-w-[205px] h-screen py-[36px] px-[20px] bg-[#ffffff]">
      <div className="flex gap-3 items-center">
        <NomNomLogo width={36} height={29} />
        <div>
          <h2 className="text-[#09090B] text-[18px] font-semibold">NomNom</h2>
          <p className="text-[#71717A] text-[12px]">Swift delivery</p>
        </div>
      </div>
      <ToggleGroup
        type="single"
        className="mt-[40px] flex flex-col items-start"
        onValueChange={handleToggleChange}
        value={value}
      >
        {sidebars.map((sidebar: SideType, index: number) => (
          <ToggleGroupItem
            key={index}
            value={sidebar.text}
            className="w-[165px] min-h-10 rounded-full px-[24px] flex items-center gap-2 justify-start focus:bg-black focus:text-white"
          >
            {sidebar.icon}
            {sidebar.text}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
