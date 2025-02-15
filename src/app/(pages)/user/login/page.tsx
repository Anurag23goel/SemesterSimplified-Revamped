import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    // TOP DIV
    <div className="h-screen md:h-screen w-screen flex items-center justify-center bg-white">
      {/* INNER DIV */}
      <div className="md:h-[92%] h-full md:w-[85%] flex rounded-xl md:gap-4">
        {/* LEFT FORM PART */}
        <div className="w-screen md:w-[55%] h-full flex flex-col gap-20 p-5">
          {/* LOGO AND HEADING */}
          <div className="flex lg:flex-row-reverse gap-2 items-center">
            <Image
              src={"/mainlogo.jpeg"}
              alt="logo"
              width={65}
              height={65}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold font-serif">
                Semester Simplified
              </h1>
              <span className="hidden md:block text-md lg:text-end text-gray-500 font-serif">
                An Online Learning Platform
              </span>
            </div>
          </div>

          {/* KICKSTART */}
          <div className="flex flex-col items-center gap-5 lg:gap-10">
            <p className="text-2xl md:text-[44px] font-semibold font-serif leading-snug">
              Kicktart Your Journey Today !
            </p>
            <LoginForm />
          </div>
        </div>

        {/* RIGHT IMAGE PART */}
        <div className="w-[45%] hidden md:flex">
          <Image
            src={"/login/login1.jpg"}
            // src={"/login/images.png"}
            alt="loginImage"
            width={10000}
            height={10000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
