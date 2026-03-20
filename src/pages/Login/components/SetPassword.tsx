import { useState } from "react";
import { useForm } from "react-hook-form";
import eye from "../../../assets/eye-open.svg";
import eyeClose from "../../../assets/eye-closed.svg";
import { useAuthStore } from "../../../store/useAuthStore";

function SetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm({
        // resolver: zodResolver(loginSchema),
        // REMOVE LATER
        mode: "onChange",
        defaultValues: {
          password: "",
          rePassword: ""
        },
      });

      const setActiveTab = useAuthStore((state) => state.setActiveTab);
      
      const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeClose);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeClose);
      setType("password");
    }
  };
  
  return (
    <div className="w-full max-w-[350px] min-h-[350px] mx-auto flex flex-col space-y-6">
      {/* Form */}
      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}
      <form className="space-y-6">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-[#555555]">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="text"
            placeholder="Enter Mobile no./Email"
            className="border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            defaultValue={"Abc@12345"}
          />
          {errors["password"] && (
            <p className="text-red-500 text-xs">
              {errors["password"]?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#555555]">
            Re-enter Password
          </label>

          {/* Container for Relative Positioning */}
          <div className="relative flex items-center">
            <input
              {...register("rePassword", { required: true })}
              type={type} // Dynamically change type here
              placeholder="Enter password/MPIN"
              className="border border-gray-300 p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              defaultValue={"Abc@12345"}
            />

            {/* Absolute positioned icon */}
            <span
              className="absolute right-4 cursor-pointer flex items-center justify-center"
              onClick={handleToggle}
            >
              <img src={icon} alt="toggle visibility" className="w-5 h-5" />
            </span>
          </div>
          {/* Validation Error Message */}
          {errors.rePassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.rePassword.message}
            </p>
          )}
        </div>
      </form>

      {/* Lower Half */}
      <div className="flex flex-col gap-6">
        {/* Login Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-sm font-semibold transition ${
            isValid
              ? "bg-[#0F62FE] text-white hover:bg-blue-700 cursor-pointer"
              : "bg-[#ECEDEE] text-gray-500"
          }`}
        //   onClick={handleSubmit(onSubmit)}
        onClick={() => setActiveTab('login')}
        >
          Set Password
        </button>
      </div>
    </div>
  )
}

export default SetPassword