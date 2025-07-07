import { NextRequest } from "next/server";
import getUserFromToken from "../../services/getUserFromToken";
import { ApiError, ApiSuccess } from "../../services/ApiResponse";
import { MESSAGE_ROOM } from "@/utils/models/messages.model";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (user && !user.success) {
      return ApiError(user.message, 400);
    }

    //LOGIC TO GET ALL THE RECENT CHATS OF USER
    const userChatRooms = await MESSAGE_ROOM.find({
      participants: user?.user.id,
    })
      .populate({
        path: "participants",
        match: { _id: { $ne: user?.user.id } }, // Exclude current user
      })
      .sort({ updatedAt: -1 });

    return ApiSuccess("Chats fetched successfully", userChatRooms, 200);
  } catch (error: any) {
    ApiError(error.message, 500);
  }
}
