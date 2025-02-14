import { ApiError, ApiSuccess } from "@/app/api/services/ApiResponse";
import databaseConnection from "@/utils/dbConnection";
import USER from "@/utils/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    databaseConnection();

    const existingUser = await USER.findOne({ email }).select("+password");

    if (!existingUser) {
      return ApiError("User not found", 404);
    }

    if (existingUser.password !== password) {
      return ApiError("Passwords don't match", 400);
    }

    const tokenPayload = {
      id: existingUser._id,
      email: existingUser.email,
      userName: existingUser.userName,
      role:existingUser.role
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string);

    return ApiSuccess("Login Successfull", existingUser, 200, {
      name: "token",
      value: token,
      options: {
        httpOnly: true,
        sameSite: "strict",
        sercure: true,
        maxAge: 60 * 60 * 24,
        path: "/",
      },
    });
  } catch (error: any) {
    console.log("Error while logging in: ", error.message);
    return ApiError(error.message, 500);
  }
}
