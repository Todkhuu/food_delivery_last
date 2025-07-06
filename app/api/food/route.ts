export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { FoodModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(req.url);
    const foodCategoryId = searchParams.get("foodCategoryId");
    const offset = Number(searchParams.get("offset") || 0);
    const limit = Number(searchParams.get("limit") || 20);

    const filter = foodCategoryId ? { category: foodCategoryId } : {};

    const foods = await FoodModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    const totalFoods = await FoodModel.countDocuments(filter);

    return NextResponse.json({ total: totalFoods, foods }, { status: 200 });
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching foods",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const foodData = await req.json();

    const newFood = await FoodModel.create(foodData);

    return NextResponse.json(
      { message: "Food successfully created", newFood },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating food:", error);
    return NextResponse.json(
      {
        message: "Error occurred while creating food",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
