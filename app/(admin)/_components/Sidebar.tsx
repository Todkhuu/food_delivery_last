"use client";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";

export type SideType = {
  icon: string;
  text: string;
};

const sidebars = [
  {
    icon: "/DashboardIcon.png",
    text: "Food menu",
  },
  {
    icon: "/TruckIcon.png",
    text: "Orders",
  },
];

export const Sidebar = () => {
  const router = useRouter();

  const clickHandler = (value: string) => {
    if (value == "Food menu") {
      router.push("/foodmenu");
    }
    if (value == "Orders") {
      router.push("/orders");
    }
  };
  return (
    <div className="min-w-[205px] h-screen py-[36px] px-[20px] bg-[#ffffff]">
      <div className="flex gap-3 items-center">
        <Image
          src={"/headerlogo.png"}
          width={36}
          height={29}
          alt=""
          className="w-[36px] h-[29px]"
        />
        <div>
          <h2 className="text-[#09090B] text-[18px] font-semibold">NomNom</h2>
          <p className="text-[#71717A] text-[12px]">Swift delivery</p>
        </div>
      </div>
      <ToggleGroup
        type="single"
        className="mt-[40px] flex flex-col items-start"
        onValueChange={clickHandler}
      >
        {sidebars.map((sidebar: SideType, index: number) => {
          return (
            <ToggleGroupItem
              key={index}
              value={sidebar.text}
              className="w-[165px] h-[40px] rounded-full px-[24px] flex justify-start focus:bg-secondary-foreground focus:text-secondary"
            >
              <Image
                src={sidebar.icon}
                width={22}
                height={22}
                alt=""
                className=""
              />
              <p>{sidebar.text}</p>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};
