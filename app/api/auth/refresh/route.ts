export const dynamic = "force-dynamic";
import { connectMongoDB } from "@/server/database";
import { UserModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    const user = await UserModel.findById(_id);

    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Амжилттай", user }, { status: 200 });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа:", error);
    return NextResponse.json(
      {
        message: "Дотоод серверийн алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
