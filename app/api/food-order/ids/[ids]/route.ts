import { FoodOrderModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { ids, status } = await req.json();

    if (!Array.isArray(ids) || !status) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Update multiple orders
    await FoodOrderModel.updateMany({ _id: { $in: ids } }, { status });

    return NextResponse.json(
      { message: "Orders updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food orders:", error);
    return NextResponse.json(
      {
        message: "An error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
