import { ApiError, ApiSuccess } from "@/app/api/services/ApiResponse";
import { NextRequest } from "next/server";
import databaseConnection from "@/utils/dbConnection";
import USER from "@/utils/models/user.model";
import otpGenerator from "otp-generator";
import { sendOtpEmail } from "@/utils/nodeMailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    databaseConnection();

    const user = await USER.findOne({ email });

    if (!user) {
      return ApiError("User not found", 404);
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: true,
      specialChars: false,
    });

    user.forgotPasswordOTP = otp;
    await user.save();

    // SENDING OTP TO USER USING NODEMAILER
    const sendEmail = await sendOtpEmail(email, otp);

    if (!sendEmail) {
      return ApiError("Failed to send OTP", 500);
    }

    return ApiSuccess("OTP send successfully", user, 200, {
      name: "userEmail",
      value: email,
      options: { httpOnly: true },
    });
  } catch (error:any) {
    return ApiError(error.message, 500);
  }
}
