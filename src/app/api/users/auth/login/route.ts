import { ApiError, ApiSuccess } from "@/app/api/services/ApiResponse";
import databaseConnection from "@/utils/dbConnection";
import USER from "@/utils/models/user.model";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { emailUsername, password } = await req.json();

  try {
    databaseConnection();

    // FIND USER BASED ON EMAIL OR USERNAME

    const existingUser = await USER.findOne({
      $or: [{ email: emailUsername }, { userName: emailUsername }],
    }).select("+password");

    if (!existingUser) {
      return ApiError("User not found", 404);
    }

    if (existingUser.password !== password) {
      return ApiError("Invalid Credentials !", 400);
    }

    const tokenPayload = {
      id: existingUser._id,
      email: existingUser.email,
      userName: existingUser.userName,
      role: existingUser.role,
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
  } catch (error) {
    console.log("Error while logging in: ", error.message);
    return ApiError(error.message, 500);
  }
}
