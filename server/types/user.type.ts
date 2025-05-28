import { Schema } from "mongoose";
import { UserRoleEnum } from "../constants";
import { FoodOrderModelType } from "./food-order.type";

export type UserModelType = {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: FoodOrderModelType[];
  createdAt: Date;
  updatedAt: Date;
};
