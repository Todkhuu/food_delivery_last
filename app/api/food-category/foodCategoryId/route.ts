import { NextRequest, NextResponse } from "next/server";
import { FoodCategoryModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";
import { Types } from "mongoose";

connectMongoDB();

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, ...categoryData } = body;

    if (!Types.ObjectId.isValid(categoryData.id)) {
      return NextResponse.json(
        { message: "Invalid food category ID" },
        { status: 400 }
      );
    }

    const updatedFoodCategory = await FoodCategoryModel.findByIdAndUpdate(
      categoryData.id,
      { ...categoryData },
      { new: true }
    );

    if (!updatedFoodCategory) {
      return NextResponse.json(
        { message: "Food category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Food category updated successfully",
        updatedFoodCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food category:", error);

    return NextResponse.json(
      {
        message: "Error occurred while updating the food category",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const categoryData = await req.json();

    const deletedFoodCategory = await FoodCategoryModel.findByIdAndDelete(
      categoryData.id
    );

    if (!deletedFoodCategory) {
      return NextResponse.json(
        { message: "Food category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Food category deleted successfully", deletedFoodCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting food category:", error);

    return NextResponse.json(
      {
        message: "Error occurred while deleting the food category",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
