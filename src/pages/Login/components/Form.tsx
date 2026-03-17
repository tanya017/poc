import { useForm } from "react-hook-form";
import { login } from "../../../api/auth.api";
import qr from '../../../assets/scan-qr-code.svg'
import eye from '../../../assets/eye-open.svg';
import eyeClose from '../../../assets/eye-closed.svg';
import { useState } from "react";

interface FormProps {
  onLoginSuccess: () => void;
}


const Form = ({ onLoginSuccess }: FormProps) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const result = await login(data["client ID"], data.password);

      if (result && !(result instanceof Error)) {
        console.log("Login Successful", result);
        onLoginSuccess();
      } else {
        console.error("Login failed: Handle UI error here");
      }
    } catch (error) {
      console.log("Submit Error", error);
    }
  };

  const [password, setPassword] = useState("");
const [type, setType] = useState('password');
const [icon, setIcon] = useState(eyeClose);

  const handleToggle = () => {
   if (type==='password'){
      setIcon(eye);
      setType('text')
   } else {
      setIcon(eyeClose)
      setType('password')
   }
}

  return (
    <div>
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
            defaultValue={"AMITH1"}
          />
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
        </div>
      </form>

      {/* Lower Half */}
      <div className="flex flex-col mt-6 gap-6">
        {/* Login with QR */}
        <div className="flex items-center justify-center gap-2">
          <img src={qr} alt="QR" className="w-5 h-5"/>
          <button className="text-[#0F62FE] font-semibold text-xs cursor-pointer">Login with QR code</button>
        </div>
        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#0F62FE] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>

        <div className="flex justify-between items-center ">
          <span className="font-semibold cursor-pointer text-[#0F62FE] ">Forgot Password</span>
          <span className="cursor-pointer text-[#0F62FE] font-semibold">Guest Login</span>
        </div>
      </div>
    </div>
  );
};

export default Form;
