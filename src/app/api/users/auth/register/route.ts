import databaseConnection from "@/utils/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import USER from "@/utils/models/user.model";

export async function POST(req: NextRequest) {
  const userData = await req.json();

  try {
    databaseConnection();
    const registeredUser = await USER.create({
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      fullName: {
        firstName: userData.fullName.firstName,
        ...(userData.fullName.lastName && {
          lastName: userData.fullName.lastName,
        }),
      },
    });

    return NextResponse.json(
      { success: true, registeredUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while registering User: ", error.message);
  }
}
