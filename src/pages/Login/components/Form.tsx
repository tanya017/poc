import { useForm } from "react-hook-form";
import { login } from "../../../api/auth.api";
import qr from "../../../assets/scan-qr-code.svg";
import eye from "../../../assets/eye-open.svg";
import eyeClose from "../../../assets/eye-closed.svg";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormValues } from "../schema/passSchema";
import { loginSchema } from "../schema/passSchema";
import { useAuthStore } from "../../../store/useAuthStore";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    // REMOVE LATER
    // mode: "onChange",
    defaultValues: {
      "client ID": "",
      password: "",
    },
  });

  useEffect(() => {
    setIsLocked(false);
  },[]);


  const setActiveTab = useAuthStore((state) => state.setActiveTab);
  const { isLocked, setIsLocked} = useAuthStore();
  const showForgotIdSuccess = useAuthStore(
    (state) => state.showForgotIdSuccess,
  );
  const setShowForgotIdSuccess = useAuthStore(
    (state) => state.setShowForgotIdSuccess,
  );

  const onSubmit = async (data: any) => {
    try {
      setIsLocked(false);
      const result = await login(data["client ID"], data.password);

      if (result?.status === 423 || result?.errorCode === "ACCOUNT_LOCKED") {
        console.log(result.status);
        setIsLocked(true);
        return;
      }

      if (result && !(result instanceof Error)) {
        console.log("Login Successful", result);
        // onLoginSuccess();
        setActiveTab("otp");
      } else {
        console.error("Login failed: Handle UI error here");
      }
    } catch (error) {
      console.log("Submit Error", error);
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-[#555555]">
            Mobile no./ Email/ Client ID
          </label>
          <input
            {...register("client ID", { required: true })}
            type="text"
            placeholder="Enter Mobile no./Email"
            className="border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            // defaultValue={"AMITH1"}
          />
          {errors["client ID"] && (
            <p className="text-red-500 text-xs">
              {errors["client ID"]?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#555555]">
            Password/ MPIN
          </label>

          {/* Container for Relative Positioning */}
          <div className="relative flex items-center">
            <input
              {...register("password", { required: true })}
              type={type} // Dynamically change type here
              placeholder="Enter password/MPIN"
              className="border border-gray-300 p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              // defaultValue={"Abc@12345"}
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
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </form>

      {/* Lower Half */}
      <div className="flex flex-col gap-6">
        {/* Login with QR */}
        <div className="flex items-center justify-center gap-2">
          <img src={qr} alt="QR" className="w-5 h-5" />
          <button className="text-[#0F62FE] font-semibold text-xs cursor-pointer">
            Login with QR code
          </button>
        </div>
        {/* Login Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-sm font-semibold transition ${
            isValid
              ? "bg-[#0F62FE] text-white hover:bg-blue-700 cursor-pointer"
              : "bg-[#ECEDEE] text-gray-500"
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>

        <div className="flex justify-between items-center ">
          <span
            className="font-semibold cursor-pointer text-[#0F62FE]"
            onClick={() => {
              setActiveTab("forgotPass");
            }}
          >
            {" "}
            Forgot user ID or password?
          </span>
          <span
            className="cursor-pointer text-[#0F62FE] font-semibold"
            onClick={() => setActiveTab("unblock-user")}
          >
            Guest Login
          </span>
        </div>

        {showForgotIdSuccess && (
          <div className="flex items-center gap-3 p-3 bg-[#EBF5F0] border border-dashed border-[#0F62FE] rounded-sm relative">
            <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 border border-[#107D4F] rounded-full">
              <span className="text-[#107D4F] text-[10px]">✓</span>
            </div>

            <p className="text-[#107D4F] text-sm font-medium">
              User ID has been sent to your register email
            </p>

            {/* <button
              onClick={() => setShowForgotIdSuccess(false)}
              className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-5 h-5 text-xs flex items-center justify-center"
            >
              ×
            </button> */}
          </div>
        )}

        {/* --- The Nudge (Appears after Forgot Password/Guest Login) --- */}
        {isLocked && (
          <div className="flex items-center gap-3 p-3 mt-2 bg-[#FFF1F1] border border-[#FFDADA] rounded-md animate-in fade-in slide-in-from-top-1">
            {/* Warning Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 border border-[#555555] rounded-full text-[#555555] text-[10px] font-bold">
              i
            </div>

            <div className="flex flex-1 items-center justify-between">
              <p className="text-[#BA1A1A] text-xs leading-tight font-medium max-w-[180px]">
                Your account is locked, to continue trading please unblock
              </p>
              <button
                type="button"
                className="text-[#0F62FE] text-xs font-bold hover:underline"
                onClick={() => setActiveTab("unblock-user")}
              >
                Unlock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
