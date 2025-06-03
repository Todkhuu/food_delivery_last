import { Food } from "./food";

export type FoodCategory = {
  _id: string;
  categoryName: string;
  foods: Food[];
  createdAt: Date;
  updatedAt: Date;
  count: number;
};
