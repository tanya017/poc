import { useForm } from "react-hook-form";
import arrow from "../../../assets/arrow-left.svg";
import { forgetUserID, forgetPassword } from "../../../api/auth.api";
import { useAuthStore } from "../../../store/useAuthStore";
import { useState } from "react";

function ForgotPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setActiveTab = useAuthStore((state) => state.setActiveTab);
  const [toggle, setToggle] = useState("password");

  const handleTabChange = (tab: string) => {
  setToggle(tab);
  reset(); // This clears all fields and resets them to their default values
};

  const onSubmit = async (data: any) => {
    if (toggle === "password") {
      try {
        const result = await forgetPassword(data.PAN, data["Client ID"]);

        console.log("Forget Password executed", result);
      } catch (error) {
        console.error("Login failed: Handle UI error here", error);
      }
    } else {
      try {
        const result = await forgetUserID(data.PAN, data["Email"]);

        console.log("Forget UserID executed", result);
      } catch (error) {
        console.error("Login failed: Handle UI error here", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      
      {/* Top header */}
      <div className="flex w-full max-w-md gap-2.75 border-b border-[#ECEDEE]">
        <button
          className={`relative flex-1 py-4 px-2 text-center font-semibold text-sm transition-colors outline-none ${toggle === "password" ? "text-[#0F62FE]" : "text-[#555555]"}`}
          onClick={() => handleTabChange("password")}
        >
          Forgot Password
          {toggle === "password" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0F62FE]" />
          )}
        </button>{" "}
        {/* Client ID */}
        <button
          className={`relative flex-1 py-4  px-2 text-center font-semibold text-sm transition-colors outline-none ${toggle === "userID" ? "text-[#0F62FE]" : "text-[#555555]"}`}
          onClick={() => handleTabChange("userID")}
        >
          Forgot User ID
          {toggle === "userID" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0F62FE]" />
          )}
        </button>{" "}
        {/* Client ID */}
      </div>

      {/* Form Details */}
      <div>
        <form action="" className="space-y-6">
          {toggle === "password" ? (
            <div className="flex flex-col gap-2">
              <label className="text-[#555555] font-medium text-xs">
                Client ID
              </label>
              <input
                type="text"
                {...register("Client ID", { required: true })}
                // className="border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                className="border border-[#ECEDEE] p-4 rounded-sm outline-none"
                defaultValue={"AMITH1"}
                placeholder="Enter user ID"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-[#555555] font-medium text-xs">
                Mobile / Email
              </label>
              <input
                type="text"
                {...register("Email", { required: true })}
                // className="border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                className="border border-[#ECEDEE] p-4 rounded-sm outline-none"
                defaultValue={"amit.gupta@omnenest.com"}
                placeholder="Enter Mobile / Email"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#555555] font-medium text-xs">PAN</label>
            <input
              type="text"
              {...register("PAN", { required: true })}
              // className="border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              className="border border-[#ECEDEE] p-4 rounded-sm  outline-none"
              defaultValue={"AMITH1234A"}
              placeholder="Enter PAN"
            />
          </div>
        </form>
      </div>

      {/* Proceed */}
      <button
        type="submit"
        className="w-full bg-[#0F62FE] text-white p-4 rounded-sm font-semibold hover:bg-blue-700 transition"
        onClick={handleSubmit(onSubmit)}
      >
        Proceed
      </button>

      {/* Updated Go Back Section */}
      <div className="flex items-center justify-center gap-2 py-2 my-2">
        <img src={arrow} alt="back" className="w-4 h-4" />
        <button
          onClick={() => setActiveTab("login")}
          className="text-sm text-blue-600"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
