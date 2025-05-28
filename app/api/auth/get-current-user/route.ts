import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../../../server/models";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Хэрэглэгчийн ID буруу эсвэл олдсонгүй." },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(userId)
      .select("-password")
      .populate("orderedFoods");

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
