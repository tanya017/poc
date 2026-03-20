import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/useAuthStore";
import { unblockUser } from "../../../api/auth.api";

function Unblock() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }, 
  } = useForm();

  const setActiveTab = useAuthStore((state) => state.setActiveTab);

  const onSubmit = async (data: any) => {
      // unblock-user
      try {
        const result = await unblockUser("AMITH1",data.PAN);
        console.log("User Unblock, verify OTP", result);
        setActiveTab("forgotPassOtp");
      } catch (error) {
        console.error("Login failed: Handle UI error here", error);
        setActiveTab('login')
      }
  };

  return (
    <div>
      {/* Form Details */}
      <div>
        <form action="" className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#555555] font-medium text-xs">
                Client ID
              </label>
              <input
                type="text"
                {...register("Client ID", { required: true })}
                className="border border-[#ECEDEE] p-4 rounded-sm outline-none"
                defaultValue={"AMITH1"}
                placeholder="Enter user ID"
              />
            </div>

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
    </div>
  );
}

export default Unblock;
