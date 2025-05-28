import { NextRequest, NextResponse } from "next/server";
import { isExistingUser, sendEmail } from "../../../../server/utils";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/server/database";

connectMongoDB();

const jwtSecret = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await isExistingUser(email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret!, { expiresIn: "1h" });

    await sendEmail(email, token);

    return NextResponse.json(
      { message: "Password reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}
