import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnection"; // Import your MongoDB connection
import USER from "@/utils/models/user.model"; // Import your User model
import mongoose from "mongoose"; // To validate ObjectId

export async function GET(
  req: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    await dbConnect(); // Ensure DB is connected

    const { userID } = await params; // Extract userID from request params

    console.log(userID);

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Fetch user from MongoDB
    const user = await USER.findById(userID).select("+password"); // Exclude password field

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
