"use client";
import { FoodDialogs } from "@/components/home/FoodDialogs";
import { useFood } from "../_context/FoodContext";
import { FoodCategory } from "@/types";

export const Foods = () => {
  const { foods } = useFood();

  return (
    <div className="max-w-[1264px] m-auto mt-[72px]">
      {foods
        .filter((category) => category.count > 0)
        .map((category: FoodCategory, index: number) => {
          return (
            <div key={index}>
              <h2 className="text-[30px] font-semibold text-secondary my-[54px] ">
                {category?.categoryName}
              </h2>
              <FoodDialogs category={category} />
            </div>
          );
        })}
    </div>
  );
};
