import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div className="h-fit md:h-screen w-screen flex items-center justify-center bg-white">
      {/* INNER DIV */}
      <div className="h-[92%] w-[85%] flex text-center rounded-xl">
        {/* LEFT PART */}
        <div className="w-[40%] hidden md:flex md:flex-col gap-5 md:items-center md:justify-center rounded-l-xl bg-yellow-400">
          {/* Logo with Rotating Borders */}
          <div className="relative flex items-center justify-center">
            
            {/* Outer Border - Spins Clockwise */}
            <div className="absolute w-[460px] h-[460px] rounded-full border-4 border-black animate-spin-slow"></div>

            {/* Inner Border - Spins Counterclockwise */}
            <div className="absolute w-[430px] h-[430px] rounded-full border-4 border-black animate-spin-reverse"></div>

            {/* Image Container */}
            <div className="relative w-[400px] h-[400px] overflow-hidden rounded-full p-3">
              <Image
                src="/mainlogo.jpeg"
                alt="logo"
                width={400}
                height={400}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col w-[90%] gap-3 mt-10">
            <h1 className="text-4xl font-semibold font-serif">
              Semester Simplified
            </h1>
            <p className="text-lg w-full capitalize text-pretty font-serif">
              Unleash Your Academic Success with Semester Simplified&apos;s One Stop
              Platform Solution. Experience All the Requirements at One Place
            </p>
          </div>
        </div>

        {/* RIGHT PART */}
        <div className="md:w-[60%] w-full flex items-center justify-center rounded-r-xl bg-white">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
