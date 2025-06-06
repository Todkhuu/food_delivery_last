import { NextRequest, NextResponse } from "next/server";
import { FoodOrderModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";
import { FoodOrderStatusEnum } from "@/server/constants";

connectMongoDB();

export async function PATCH(req: NextRequest) {
  try {
    const updateData = await req.json();

    const updatedFoodOrder = await FoodOrderModel.findByIdAndUpdate(
      updateData.id,
      updateData,
      { new: true }
    );

    if (!updatedFoodOrder) {
      return NextResponse.json(
        { message: "Food order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Food order successfully updated", updatedFoodOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food order:", error);

    return NextResponse.json(
      {
        message: "An error occurred while updating the food order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
