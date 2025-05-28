import { FoodOrderStatusEnum } from "../constants";
import { Model, Schema, model, models } from "mongoose";
import { FoodOrderItemModelType, FoodOrderModelType } from "../types";

const FoodOrderItemSchema = new Schema<FoodOrderItemModelType>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, ref: "Foods", required: true },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<FoodOrderModelType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodOrderModel: Model<FoodOrderModelType> =
  models["FoodOrders"] ||
  model<FoodOrderModelType>("FoodOrders", FoodOrderSchema);
