import { NextRequest, NextResponse } from "next/server";
import { FoodModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

export async function GET(req: NextRequest) {
  try {
    const foodData = await req.json();

    const food = await FoodModel.findById(foodData.id);

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

export async function PATCH(req: NextRequest) {
  try {
    const foodData = await req.json();

    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodData.id,
      foodData,
      {
        new: true,
      }
    );

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

export async function DELETE(req: NextRequest) {
  try {
    const foodData = await req.json();

    const deletedFood = await FoodModel.findByIdAndDelete(foodData.id);

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
