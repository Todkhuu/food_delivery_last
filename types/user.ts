import { UserRoleEnum } from "./common";
import { AllFoodOrders } from "./order";

export type UserType = {
  _id?: string;
  email?: string;
  address?: string;
  role?: UserRoleEnum;
  orderedFoods?: AllFoodOrders[];
  createdAt?: Date;
  updatedAt?: Date;
};
