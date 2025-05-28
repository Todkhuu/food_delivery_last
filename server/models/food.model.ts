import { FoodModelType } from "../types";
import { Model, Schema, model, models } from "mongoose";

const FoodSchema = new Schema<FoodModelType>(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "FoodCategories",
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodModel: Model<FoodModelType> =
  models["Foods"] || model<FoodModelType>("Foods", FoodSchema);
