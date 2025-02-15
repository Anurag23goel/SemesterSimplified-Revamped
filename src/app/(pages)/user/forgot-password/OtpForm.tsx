"use client";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ResetPasswordInputs = {
  newPassword: string;
  confirmPassword: string;
};

export default function OtpForm() {
  const { register, handleSubmit } = useForm<ResetPasswordInputs>();
  const router = useRouter();

  const [timer, setTimer] = useState(15);
  const [canResend, setCanResend] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password

  // ✅ Timer Effect
  useEffect(() => {
    if (timer > 0) {
      setCanResend(false);
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true); // Enable Resend OTP button when timer ends
    }
  }, [timer]);

  // ✅ Resend OTP Handler (Resets Timer)
  const handleResendOTP = async () => {
    if (!canResend) return; // Prevents spamming the button

    try {
      const response = await axios.post(
        "/api/users/auth/forgot-password",
        { email: userEmail },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("OTP resent successfully!");
        setTimer(15); // Reset the timer
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to resend OTP");
    }
  };

  const sendOtpHandler = async () => {
    try {
      const response = await axios.post(
        "/api/users/auth/forgot-password",
        { email: userEmail },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setStep(2);
        setTimer(15); // Start countdown after sending OTP
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error sending OTP");
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const response = await axios.post(
        "/api/users/auth/confirm-otp",
        { otp: userOTP },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("OTP verified!");
        setStep(3);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid OTP");
    }
  };

  const resetPasswordHandler = async (data: ResetPasswordInputs) => {
    try {
      const response = await axios.post(
        "/api/users/auth/reset-password",
        { newPassword: data.newPassword },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Password updated successfully!");
        router.push("/user/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error resetting password");
    }
  };

  return (
    <div className="rounded-lg w-full h-fit">
      {step === 1 && (
        <div className="text-center">
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className="w-full border p-3 rounded-md"
          />
          <button
            onClick={sendOtpHandler}
            className="w-full bg-yellow-500 text-white font-semibold p-3 rounded-md mt-4"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <p className="text-black text-xl mb-4">
            A 6-digit OTP has been sent to{" "}
            <span className="underline">{userEmail}</span>
          </p>
          <OtpInput
            value={userOTP}
            onChange={setUserOTP}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="w-14 h-14 text-xl text-black text-center rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            )}
            containerStyle="flex justify-center gap-3"
          />
          <button
            onClick={verifyOtpHandler}
            className="w-full bg-yellow-500 text-white font-semibold p-3 rounded-md mt-4"
          >
            Verify OTP
          </button>
          <p className="mt-3">
            Didn't receive OTP?{" "}
            <span
              onClick={handleResendOTP}
              className={`text-blue-500 hover:underline hover:cursor-pointer ${
                !canResend ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {canResend ? "Resend OTP" : `Resend in ${timer}s`}
            </span>
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Set New Password</h2>
          <p className="text-gray-600 mb-4">
            Enter a new password for your account
          </p>
          <form
            onSubmit={handleSubmit(resetPasswordHandler)}
            className="flex flex-col gap-3"
          >
            <input
              type="password"
              {...register("newPassword")}
              placeholder="New Password"
              className="w-full border p-3 rounded-md"
            />
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full border p-3 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold p-3 rounded-md mt-4"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
