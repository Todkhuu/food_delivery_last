import { Schema } from "mongoose";

export type FoodCategoryModelType = {
  _id: Schema.Types.ObjectId;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};
