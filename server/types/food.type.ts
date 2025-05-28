import { Schema } from "mongoose";
import { FoodCategoryModelType } from "./food-category.type";

export type FoodModelType = {
  _id: Schema.Types.ObjectId;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: FoodCategoryModelType;
  createdAt: Date;
  updatedAt: Date;
};
