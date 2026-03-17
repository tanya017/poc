import { useForm } from "react-hook-form";
import { validateOTP } from "../../../api/auth.api";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface OtpProps {
  // Ensure the parent Login.tsx passes the actual username used to login
  username?: string;
}

function Otp({ username = "AMITH1" }: OtpProps) {
  const { register, handleSubmit } = useForm();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const navigate = useNavigate();

  // const onSubmit = async (data: any) => {
  //   // 1. Keep as string for the local check, then convert for API
  //   const otpString = data.otp;

  //   // Use string comparison to avoid issues with leading zeros
  //   if (otpString === "1234") {
  //     try {
  //       // Pass otpString directly. TypeScript will be happy because it's a string.
  //       const result = await validateOTP(username, otpString);

  //       if (result && !(result instanceof Error)) {
  //         const token = data.jwtTokens.accessToken;
  //         setAccessToken(token);
  //         console.log("OTP Verified!", result);
  //       }
  //     } catch (error) {
  //       console.error("API Error", error);
  //     }
  //   } else {
  //     alert("Invalid OTP. Please try 1234");
  //   }
  // };

  const onSubmit = async(data: any) => {
     try {
            const result = await validateOTP(username,data.otp);
    
            if(result && !(result instanceof Error)) {
              const token = result.jwtTokens.accessToken;
              setAccessToken(token);
              console.log("OTP Vaidation Successful", result);
              navigate('/dashboard');
            } else {
                console.error("OTP Vaidation Failed");
            } 
        } catch(error) {
            console.log("Submit Error", error);
        }
  }
  return (
    <div className="w-full max-w-87.5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-800 text-xl">Enter OTP</h3>
          <p className="text-[#555555] text-xs mt-1">
            OTP Sent on +91 8826599913
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              {...register("otp", {
                required: true,
                pattern: /^[0-9]{4}$/, // Ensures only numbers and exactly 4 digits
              })}
              type="text"
              inputMode="numeric" // Opens number pad on mobile
              maxLength={4}
              placeholder="0000"
              className="w-full tracking-[1em] text-center border-b-2 border-gray-300 p-3 focus:border-[#0F62FE] outline-none font-bold text-2xl"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#707071] text-xs font-semibold">
              Resend in 00:30
            </p>
            <button
              type="button"
              className="text-[#0F62FE] py-2 font-semibold text-xs hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0F62FE] p-4 text-white rounded-md font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default Otp;


