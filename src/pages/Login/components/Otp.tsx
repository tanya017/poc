import { useForm, Controller } from "react-hook-form";
import { authenticateOtp, validateOTP } from "../../../api/auth.api";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

interface OtpProps {
  username?: string;
}

function Otp({ username = "AMITH1" }: OtpProps) {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { otp: ["", "", "", ""] },
  });

  const activeTab = useAuthStore((state) => state.activeTab);
  const setActiveTab = useAuthStore((state) => state.setActiveTab);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isLocked = useAuthStore((state) => state.isLocked);

  const otpValues = watch("otp");

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otpValues];
    // Take only the last character (for overwriting)
    newOtp[index] = value.slice(-1);
    setValue("otp", newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: { otp: string[] }) => {
    const fullOtp = data.otp.join("");
    if (fullOtp.length !== 4) return;

    if (activeTab === "otp") {
      try {
        const result = await validateOTP(username, fullOtp);
        if (result && !(result instanceof Error)) {
          const token = result.jwtTokens.accessToken;
          setAccessToken(token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Submit Error", error);
      }
    } else if (activeTab === "forgotPassOtp") {
      try {
        const result = await authenticateOtp(Number(fullOtp), username, true);
        if(!isLocked) {
          setActiveTab("set-password");
        } else {
          setActiveTab('login');
        }  
          console.log("authenticate otp executed", result);

      } catch (error) {
        console.error("Submit Error", error);
      }
    }
  };

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
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="relative w-14 h-16">
                <Controller
                  name={`otp.${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full h-full text-center border-2 border-gray-300 rounded-md focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] outline-none font-bold text-2xl transition-all bg-transparent relative z-10"
                    />
                  )}
                />
                {/* The Dot Placeholder */}
                {!otpValues[index] && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
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
          disabled={otpValues.some((v) => v === "")}
          className="w-full bg-[#0F62FE] p-4 text-white rounded-sm font-semibold hover:bg-blue-700 disabled:bg-[#ECEDEE] transition shadow-sm"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default Otp;
