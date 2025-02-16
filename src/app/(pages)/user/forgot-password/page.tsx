import Image from "next/image";
import OtpForm from "./OtpForm";

export default function ForgotPassword() {
  return (
    <div className="h-screen w-screen flex md:items-center md:justify-center">
      {/* INNER DIV */}
      <div className="md:h-[90%] md:w-[90%] h-full w-full flex">
        {/* LEFT PART => IMAGE */}
        <div className="w-[55%] h-full hidden md:flex rounded-l-xl">
          <Image
            src={"/login/forgot.avif"}
            alt="avatar"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* RIGHT PART => FORGGET-PASSWORD */}
        <div className="w-full md:w-[45%] bg-gray-100 rounded-r-xl h-full flex flex-col gap-10 items-center justify-center">
          {/* LOCK IMAGE */}
          <Image
            src={"/login/lock.png"}
            alt=""
            width={1000}
            height={1000}
            className="w-[30%]"
          />

          {/* TEXT => FORGOT ? */}
          <div className="w-full md:w-[80%] flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl md:text-[44px] text-center font-semibold font-serif">
              Forgot Your Password ?
            </h1>
            <p className="text-xl font-serif w-[85%] text-center">
              Do not worry! Enter your{" "}
              <span className="font-semibold">registered email address</span> and we&apos;ll
              send you an OTP to reset your password
            </p>
          </div>

          {/* OTP FORM */}
          <div className="w-[80%] flex items-center justify-center">
            <OtpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
