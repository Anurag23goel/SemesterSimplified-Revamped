"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Define TypeScript types for form fields
type RegisterFormInputs = {
  fullName: {
    firstName: string;
    lastName: string;
  };
  userName:string;
  email: string;
  password: string;
  phoneNumber: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const registerFormSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post("/api/users/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.data);
      

      if (response.data.success) {
        router.push("/"); // ✅ Redirect after successful registration
      }
    } catch (error: any) {
      setServerError(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {serverError && (
          <p className="text-red-500 text-center">{serverError}</p>
        )}

        <form onSubmit={handleSubmit(registerFormSubmit)} className="space-y-4">
          
          {/* FULL NAME */}
          <div className="flex gap-3 w-full">
            {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-medium">
              First Name
            </label>
            <input
              type="text"
              {...register("fullName.firstName", {
                required: "First name is required",
              })}
              className="p-3 border rounded-md w-full"
              placeholder="Enter First Name"
            />
            {errors.fullName?.firstName && (
              <p className="text-red-500">
                {errors.fullName.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-medium">
              Last Name
            </label>
            <input
              type="text"
              {...register("fullName.lastName", {
                required: "Last name is required",
              })}
              className="p-3 border rounded-md w-full"
              placeholder="Enter Last Name"
            />
            {errors.fullName?.lastName && (
              <p className="text-red-500">{errors.fullName.lastName.message}</p>
            )}
          </div>
          </div>

          {/* USERNAME */}
          <div className="flex flex-col">
            <label htmlFor="userName" className="font-medium">
              Username
            </label>
            <input
              type="text"
              {...register("userName", {
                required: "Username should be unique",
              })}
              className="p-3 border rounded-md w-full"
              placeholder="Enter First Name"
            />
            {errors.userName && (
              <p className="text-red-500">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className="p-3 border rounded-md"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="p-3 border rounded-md"
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number (10 digits required)",
                },
              })}
              className="p-3 border rounded-md"
              placeholder="Enter Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
