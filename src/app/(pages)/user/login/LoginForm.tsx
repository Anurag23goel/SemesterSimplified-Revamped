"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/slices/AuthSlice";
import toast from "react-hot-toast";

type LoginFormInputs = {
  emailUsername: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const loginFormSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    try {
      const response = await axios.post("/api/users/auth/login", data);

      if (response.data.success) {
        dispatch(login(response.data.data.user));
        toast.success("Login successful!");
        router.push(`/user/${response.data.data.user._id}/home`); // ✅ Redirect on successful login
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div className="w-[85%] h-fit">
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <form
        onSubmit={handleSubmit(loginFormSubmit)}
        className="grid grid-cols-1 gap-4 w-full h-fit"
      >
        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-xl font-medium">
            Email<span className="text-gray-500 text-sm"> or </span>Username
          </label>
          <input
            type="text"
            {...register("emailUsername", {
              required: "Email or Username is required",
            })}
            className="p-3 border rounded-md border-gray-400 bg-gray-100"
            placeholder="Enter Email or Username"
          />
          {errors.emailUsername && (
            <p className="text-red-500">{errors.emailUsername.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium text-xl">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="p-3 border border-gray-400 rounded-md bg-gray-100"
            placeholder="Enter Password"
          />
          <Link
            href={"/user/forgot-password"}
            className="hover:underline hover:text-blue-500 text-end mt-1"
          >
            Forgot Password?
          </Link>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-yellow-500 text-black text-lg font-semibold p-3 rounded-md hover:bg-yellow-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-lg">
          Don&apos;t have an account ?{" "}
          <Link className="hover:underline text-blue-600" href="/user/register">
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
}
