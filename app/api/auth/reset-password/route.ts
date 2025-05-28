import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { hashSync } from "bcryptjs";
import { UserModel } from "@/server/models";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

const jwtSecret = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  try {
    const { password, token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const id = decoded.id;

    const hashedPassword = hashSync(password, 10);

    const user = await UserModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Your password has been successfully updated",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      {
        message: "An error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
