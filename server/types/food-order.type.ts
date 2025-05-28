import { Schema } from "mongoose";
import { UserModelType } from "./user.type";
import { FoodOrderStatusEnum } from "../constants";
import { FoodOrderItemModelType } from "./food-order-item.type";

export type FoodOrderModelType = {
  _id: Schema.Types.ObjectId;
  user: UserModelType;
  totalPrice: number;
  foodOrderItems: FoodOrderItemModelType[];
  status: FoodOrderStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};
