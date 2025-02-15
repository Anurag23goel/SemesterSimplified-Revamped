"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Phone, University, User } from "lucide-react";
import Link from "next/link";

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
  const [terms, setTerms] = useState(false);
  const router = useRouter();

  const registerFormSubmit = async (data: RegisterFormInputs) => {
    if (terms === false) {
      setServerError("Please accept terms and conditions");
    }

    console.log(terms);

    try {
      const response = await axios.post("/api/users/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.data);

      if (response.data.success) {
        router.push("/"); // ✅ Redirect after successful registration
      }
    } catch (error) {
      setServerError(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <>
      {serverError && <p className="text-red-500 text-center">{serverError}</p>}

      <form onSubmit={handleSubmit(registerFormSubmit)} 
      className="grid grid-cols-1 md:grid-cols-2 gap-3 px-6 py-4 rounded-3xl w-full md:w-[75%] mx-auto h-fit md:h-[90%] ">
        
        {/* HEADING */}
        <h2 className="text-xl md:text-3xl font-semibold mb-3 text-center col-span-full">
          Let's Get Started
        </h2>

        {/* NAME */}
        <div className="flex flex-col w-full gap-2">
          <label
            htmlFor="firstName"
            className="font-medium flex gap-1 items-center"
          >
            <User /> Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "First name is required",
            })}
            className="p-3 border rounded-md w-full bg-gray-100"
            placeholder="Enter Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* USERNAME */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="userName"
            className="font-medium flex gap-1 items-center"
          >
            <User /> Username
          </label>
          <input
            type="text"
            {...register("userName", {
              required: "Username should be unique",
            })}
            className="p-3 border rounded-md w-full bg-gray-100"
            placeholder="Enter First Name"
          />
          {errors.userName && (
            <p className="text-red-500">{errors.userName.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className="font-medium flex gap-1 items-center"
          >
            <Mail /> Email
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
            className="p-3 border rounded-md w-full bg-gray-100"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* PHONE NUMBER */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="phoneNumber"
            className="font-medium flex gap-1 items-center"
          >
            <Phone />
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
            className="p-3 border rounded-md bg-gray-100 w-full"
            placeholder="Enter Phone Number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* UNIVERSITY */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="university"
            className="font-medium flex gap-1 items-center"
          >
            <University /> University
          </label>
          <select
            name="university"
            id="university"
            className="p-3 rounded-md w-full border bg-gray-100"
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
          <label
            htmlFor="college"
            className="font-medium flex gap-1 items-center"
          >
            <University /> College (optional)
          </label>
          <select
            name="college"
            id="college"
            className="p-3 rounded-md w-full border bg-gray-100"
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
          <label
            htmlFor="password"
            className="font-medium flex gap-1 items-center"
          >
            <Lock /> Password
          </label>
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="p-3 border rounded-md w-full pr-12 bg-gray-100"
              placeholder="••••••••"
            />
            {showPassword ? (
              <EyeOff
                size={20}
                onClick={() => setShowPassword(false)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
              />
            ) : (
              <Eye
                size={20}
                onClick={() => setShowPassword(true)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="font-medium flex gap-1 items-center"
          >
            <Lock /> Confirm Password
          </label>
          <div className="flex items-center relative">
            <input
              type={confrimPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match", // ✅ Validate match
              })}
              className="p-3 border rounded-md w-full bg-gray-100"
              placeholder="••••••••"
            />
            {confrimPassword ? (
              <EyeOff
                size={20}
                onClick={() => setConfrimPassword(false)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
              />
            ) : (
              <Eye
                size={20}
                onClick={() => setConfrimPassword(true)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* TERMS AND CONDITIONS */}
        <div className="flex md:gap-2 items-center col-span-full ">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label htmlFor="terms">
            I agree to all the{" "}
            <span className="text-blue-500">Terms and Conditions</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mx-auto w-full bg-yellow-400 py-2 text-lg text-black font-semibold rounded-md hover:scale-105 hover:transition hover:duration-300 col-span-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Create Account"}
        </button>

        {/* SIGN IN LINK */}
        <div className="col-span-full text-center">
          <p className="text-lg">
            Already Have an Account ?{" "}
            <Link
              className="text-blue-500 hover:underline"
              href={"/user/login"}
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
