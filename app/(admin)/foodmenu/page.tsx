"use client";
import { AvatarDemo } from "../_components/Avatar";
import { AddCategories } from "../_components/AddCategories";
import { AddFoods } from "../_components/AddFoods";
import { AddedFoods } from "../_components/AddedFoods";
import { FoodCategory } from "@/types";
import { useFood } from "@/app/(main)/_context/FoodContext";

export default function FoodMenu() {
  const { foods } = useFood();
  console.log("fooods", foods);
  return (
    <div className="bg-[#f4f4f5] px-[40px]">
      <div className="w-[87vw] flex justify-end my-[24px]">
        <AvatarDemo />
      </div>
      <AddCategories />
      {foods.map((category: FoodCategory, index: number) => {
        return (
          <div
            key={index}
            className="h-auto bg-[#ffffff] my-[24px] rounded-[12px] p-[20px]"
          >
            <h2></h2>
            <div className="h-auto bg-[#ffffff] flex flex-wrap gap-4">
              <AddFoods category={category} />
              <AddedFoods category={category} categories={foods} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
