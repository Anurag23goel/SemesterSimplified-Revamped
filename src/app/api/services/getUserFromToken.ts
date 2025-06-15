import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import databaseConnection from "@/utils/dbConnection";
import USER from "@/utils/models/user.model";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export default async function getUserFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return {
        success: false,
        message: "No token found",
      };
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload || !payload.id) {
      return {
        success: false,
        message: "Invalid Token Payload",
      };
    }

    await databaseConnection();

    const user = await USER.findById(payload.id);

    if (!user) {
      return {
        success: false,
        message: "Token found but user not found",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log("Error while getting user from token:", error);
    return null;
  }
}
