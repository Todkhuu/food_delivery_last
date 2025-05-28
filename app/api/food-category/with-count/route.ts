import { NextRequest, NextResponse } from "next/server";
import { FoodCategoryModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

export async function GET(_: NextRequest) {
  try {
    const foodCategoriesWithCount = await FoodCategoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $project: {
          Id: "$_id",
          categoryName: "$categoryName",
          count: { $size: "$foods" },
        },
      },
    ]);

    const formattedResponse = foodCategoriesWithCount.map((category) => ({
      Id: category.Id.toString(),
      categoryName: category.categoryName,
      count: category.count,
    }));

    return NextResponse.json(formattedResponse, { status: 200 });
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
