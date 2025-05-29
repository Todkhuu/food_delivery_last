import { UserModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const awaitedParams = await params;
    const { id } = awaitedParams;
    const userData = await req.json();

    const updatedFood = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updatedFood) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", updatedFood },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      {
        message: "An error occurred while updating the user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
