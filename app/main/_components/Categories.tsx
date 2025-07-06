"use client";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";

export const Categories = () => {
  return (
    <div className="max-w-[1264px] m-auto mt-[32px]">
      <h2 className="text-[30px] font-semibold text-white mb-[38px]">
        Categories
      </h2>
      <CategoriesCarousel />
    </div>
  );
};
