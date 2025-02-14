"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

// ✅ Define TypeScript types for form fields
type RegisterFormInputs = {
  name: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  university: string;
  college: string | null;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();
  const password = watch("password");

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confrimPassword, setConfrimPassword] = useState(false);
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
    <div className=" w-full h-full flex flex-col items-center justify-center shadow-md rounded-lg bg-gray-100">
      {serverError && <p className="text-red-500 text-center">{serverError}</p>}

      <form
        onSubmit={handleSubmit(registerFormSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-[70%] mx-auto h-fit px-6 py-4 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-3 text-center col-span-full">
          Get Started
        </h2>

        {/* NAME */}
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="firstName" className="font-medium">
            Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "First name is required",
            })}
            className="p-3 border rounded-md w-full"
            placeholder="Enter Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* USERNAME */}
        <div className="flex flex-col gap-2 w-full">
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
            <p className="text-red-500">{errors.userName.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-2 w-full">
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
            className="p-3 border rounded-md w-full"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* PHONE NUMBER */}
        <div className="flex flex-col gap-2 w-full">
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

        {/* UNIVERSITY */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="university" className="font-medium">
            University
          </label>
          <select
            name="university"
            id="university"
            className="p-3 rounded-md w-full border"
          >
            <option value="">Select University</option>
            <option value="AKTU" className="">
              AKTU
            </option>
          </select>

          {errors.university && (
            <p className="text-red-500">{errors.university.message}</p>
          )}
        </div>

        {/* COLLEGE */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="college" className="font-medium">
            College (optional)
          </label>
          <select
            name="college"
            id="college"
            className="p-3 rounded-md w-full border"
          >
            <option value="">Select College</option>
            <option value="DGI">Dronacharya Group of Institutions</option>
          </select>

          {errors.college && (
            <p className="text-red-500">{errors.college.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div className="flex items-center relative">
            <input
              type={showPassword ? ("text") : ("password")}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="p-3 border rounded-md w-full pr-12"
              placeholder="••••••••"
            />
            {showPassword ? (
              <EyeOff size={20} onClick={() => setShowPassword(false)} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
            ) : (
              <Eye size={20} onClick={() => setShowPassword(true)} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match", // ✅ Validate match
            })}
            className="p-3 border rounded-md w-full"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* TERMS AND CONDITIONS */}
        <div className="flex gap-2 mt-2 col-span-full">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">
            I agree to all the{" "}
            <span className="text-blue-500">Terms and Conditions</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mx-auto mt-4 w-[50%] bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 col-span-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
