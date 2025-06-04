import { NextRequest, NextResponse } from "next/server";
import { FoodModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { foodId: string } }
) {
  try {
    const { foodId } = params;

    const food = await FoodModel.findById(foodId);

    if (!food) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", food }, { status: 200 });
  } catch (error) {
    console.error("Error fetching food:", error);

    return NextResponse.json(
      {
        message: "An error occurred while fetching the food",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { foodId: string } }
) {
  try {
    const { foodId } = await params;
    const foodData = await req.json();

    console.log("BODY DATA", foodData);

    const updatedFood = await FoodModel.findByIdAndUpdate(foodId, foodData, {
      new: true,
    });

    if (!updatedFood) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Food updated successfully", updatedFood },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating food:", error);

    return NextResponse.json(
      {
        message: "An error occurred while updating the food",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { foodId: string } }
) {
  try {
    const { foodId } = params;

    const deletedFood = await FoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Food successfully deleted", deletedFood },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting food:", error);

    return NextResponse.json(
      {
        message: "Error occurred while deleting food",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
