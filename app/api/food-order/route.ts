import { NextRequest, NextResponse } from "next/server";
import { FoodOrderModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";
import { FoodOrderStatusEnum } from "@/server/constants";

connectMongoDB();

export async function POST(req: NextRequest) {
  try {
    const foodOrderData = await req.json();

    const newFoodOrder = await FoodOrderModel.create(foodOrderData);

    return NextResponse.json(
      { message: "Order successfully created", newFoodOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    return NextResponse.json(
      {
        message: "An error occurred while creating the order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status") || FoodOrderStatusEnum.PENDING;
    const offset = Number(searchParams.get("offset") || 0);
    const limit = Number(searchParams.get("limit") || 20);

    // Хэрвээ статус дээр шүүх шаардлагатай бол:
    // const filter = status ? { status } : {};

    const allFoodOrders = await FoodOrderModel.find()
      .populate("user")
      .populate({
        path: "foodOrderItems.food",
        model: "Foods",
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    const totalFoods = await FoodOrderModel.countDocuments();

    return NextResponse.json(
      { total: totalFoods, allFoodOrders },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching food orders:", error);

    return NextResponse.json(
      {
        message: "An error occurred while fetching food orders",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { ids, updateData } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "Invalid or empty ids array" },
        { status: 400 }
      );
    }

    const result = await FoodOrderModel.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );

    return NextResponse.json(
      {
        message: "Food orders successfully updated",
        updatedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food orders:", error);

    return NextResponse.json(
      {
        message: "An error occurred while updating the food orders",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
