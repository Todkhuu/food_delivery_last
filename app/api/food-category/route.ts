import { NextRequest, NextResponse } from "next/server";
import { FoodCategoryModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

export async function GET(_: NextRequest) {
  try {
    const allFoodCategories = await FoodCategoryModel.find();

    return NextResponse.json(allFoodCategories, { status: 200 });
  } catch (error) {
    console.error("Error fetching food categories:", error);

    return NextResponse.json(
      {
        message: "An error occurred while fetching food categories",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const foodCategoryData = await req.json();

    const newFoodCategory = await FoodCategoryModel.create(foodCategoryData);

    return NextResponse.json(
      { message: "Food category created successfully", newFoodCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating food category:", error);

    return NextResponse.json(
      {
        message: "Error occurred while creating the food category",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
