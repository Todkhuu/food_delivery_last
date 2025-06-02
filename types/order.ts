import { User } from "@/constants";
import { FoodOrderStatusEnum } from "./common";
import { Food } from "./food";

export type FoodOrderItem = {
  quantity: number;
  food: Food;
};

export type FoodOrder = {
  total: number;
  foodOrderItems: AllFoodOrders[];
};

export type AllFoodOrders = {
  _id: string;
  user: User;
  totalPrice: number;
  status: FoodOrderStatusEnum;
  foodOrderItems: FoodOrderItem[];
  createdAt: Date;
  updatedAt: Date;
};
