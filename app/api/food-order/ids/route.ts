import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { FoodOrderModel } from "@/server/models";

export async function PATCH(req: Request) {
  const { ids, status } = await req.json();

  if (!Array.isArray(ids) || !status) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Id-уудыг шалгах
  for (const id of ids) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: `Invalid id format: ${id}` },
        { status: 400 }
      );
    }
  }

  try {
    const result = await FoodOrderModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status } }
    );
    return NextResponse.json({ updatedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
