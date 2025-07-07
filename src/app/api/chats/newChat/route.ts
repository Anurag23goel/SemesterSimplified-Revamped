import { NextRequest } from "next/server";
import { ApiError, ApiSuccess } from "../../services/ApiResponse";
import getUserFromToken from "../../services/getUserFromToken";
import { MESSAGE_ROOM } from "@/utils/models/messages.model";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);

    if (user && !user.success) {
      return ApiError(user.message, 400);
    }

    const { userId } = await request.json();
    console.log("IS USER KE SAATH ROOM CREATE KARNA HAI - ", userId);

    const existingChatRoom = await MESSAGE_ROOM.findOne({
      participants: {
        $all: [user?.user.id, userId],
      },
    });

    if (existingChatRoom) {
      return ApiSuccess("Chat room already exists", existingChatRoom, 200);
    }

    const newChatRoom = await MESSAGE_ROOM.create({
      participants: [user?.user.id, userId],
    });

    console.log("NEW CHAT ROOM - ", newChatRoom);
    

    return ApiSuccess("Chat room created successfully", newChatRoom, 200);
  } catch (error: any) {
    return ApiError(error.message, 500);
  }
}
