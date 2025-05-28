import { connectMongoDB } from "@/server/database";
import { UserModel } from "@/server/models";
import { hashSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to DB...");
    await connectMongoDB();

    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email are required" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = hashSync(password, 10);

    const createUser = await UserModel.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Register successfully", createUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in sign-up:", error);
    return NextResponse.json(
      {
        message: "Error in sign-up",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
