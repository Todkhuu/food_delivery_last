import { FoodCategory } from "./category";

export type Food = {
  _id?: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId?: FoodCategory;
  categoryName?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
