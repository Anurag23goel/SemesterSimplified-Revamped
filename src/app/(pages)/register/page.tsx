import RegisterForm from "./RegisterForm";
export default function Register() {
  return (
    <div className="h-full w-full flex">
      {/* LOGO */}
      <div className="hidden md:flex items-center justify-center w-[40%] h-full">
        IMAGE
      </div>

      {/* FORM */}
      <div className="w-full md:w-[60%] h-full">
        <RegisterForm />
      </div>
    </div>
  );
}
