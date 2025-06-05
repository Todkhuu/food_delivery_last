"use client";
import { Food, FoodCategory } from "@/types";
import { EditFood } from "./EditFood";

type categoryType = {
  categories: FoodCategory[];
  category: FoodCategory;
};

export const AddedFoods = ({ category, categories }: categoryType) => {
  return (
    <>
      {category.foods.map((oneFood: Food) => {
        return (
          <div
            key={oneFood._id}
            className="w-[270px] h-[241px] border-[1px] rounded-[20px] p-4"
          >
            <div
              style={{ backgroundImage: `url(${oneFood.image})` }}
              className="w-[100%] h-[129px] rounded-xl bg-center bg-cover flex items-end justify-end p-[20px]"
            >
              <EditFood
                oneFood={oneFood}
                category={category}
                categories={categories}
              />
            </div>
            <div className="flex justify-between mt-[20px]">
              <h2 className="text-[#ef4444] text-[14px] ">
                {oneFood.foodName}
              </h2>
              <p className="text-[12px]">${oneFood.price}</p>
            </div>
            <p className="text-[12px]">{oneFood.ingredients}</p>
          </div>
        );
      })}
    </>
  );
};
