"use client";
import { NomNomLogo } from "@/components/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Facebook, Instagram } from "lucide-react";
import React from "react";

const nomnom = ["Home", "Contact us", "Delivery zone"];
const menu = [
  "Appetizers",
  "Salads",
  "Pizzas",
  "Lunch favorites",
  "Main dishes",
];
const menus = [
  "Side dish",
  "Brunch",
  "Desserts",
  "Beverages",
  "Fish & Sea foods",
];
const footer = [
  "Copy right 2024 © Nomnom LLC",
  "Privacy policy",
  "Terms and conditoin",
  "Cookie policy",
];

export const Footer = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="h-[755px] bg-[#18181b] mt-[134px] pt-[60px]">
      <Carousel
        opts={{ align: "start" }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="h-[92px] bg-[#ef4444]"
      >
        <CarouselContent className="h-full">
          {Array.from({ length: 20 }).map((_, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/6 flex justify-center items-center"
            >
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-[36px] font-semibold text-secondary">
                  Fresh fast delivered
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="w-[1264px] m-auto h-[228px] flex mt-[76px]">
        <div className="flex flex-col gap-3 items-center">
          <NomNomLogo width={46} height={37} />
          <div className="text-center">
            <h2 className="text-white text-[20px] font-semibold">
              Nom<span className="text-[#ef4444]">Nom</span>
            </h2>
            <p className="text-[#f4f4f5] text-[12px]">Swift delivery</p>
          </div>
        </div>
        <div className="w-[788px] flex justify-between ml-[220px]">
          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] text-[#71717a]">NOMNOM</h3>
            {nomnom.map((nom, index) => (
              <p key={index} className="text-[16px] text-[#fafafa]">
                {nom}
              </p>
            ))}
          </div>
          <div className="w-[320px] flex justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-[16px] text-[#71717a]">MENU</h3>
              {menu.map((menu, index) => (
                <p key={index} className="text-[16px] text-[#fafafa]">
                  {menu}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3>
                <br></br>
              </h3>
              {menus.map((menu, index) => (
                <p key={index} className="text-[16px] text-[#fafafa]">
                  {menu}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[21px]">
            <h3 className="text-[16px] text-[#71717a]">FOLLOW US</h3>
            <div className="flex gap-4">
              <Facebook className="text-white" />
              <Instagram className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-[#71717a] mt-[104px]">
        <div className="w-[1264px] m-auto flex gap-[48px]">
          {footer.map((footer, index) => (
            <p key={index} className="text-[14px] text-[#71717a] pt-[32px]">
              {footer}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
