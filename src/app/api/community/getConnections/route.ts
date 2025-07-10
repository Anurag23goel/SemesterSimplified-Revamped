import { NextRequest } from "next/server";
import { ApiError, ApiSuccess } from "../../services/ApiResponse";
import getUserFromToken from "../../services/getUserFromToken";
import USER from "@/utils/models/user.model";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (user && !user.success) {
      return ApiError(user.message, 400);
    }

    console.log(user?.user);

    const userConnections = await USER.findById(user?.user._id).populate({
      path: "connections",
      match: { _id: { $ne: user?.user.id } }, // Exclude current user
      select: "_id name profilePicture college course",
    });

    return ApiSuccess(
      "Connections fetched successfully",
      userConnections.connections,
      200
    );
  } catch (error: any) {
    return ApiError(error.message, 500);
  }
}
