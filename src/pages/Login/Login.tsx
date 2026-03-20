import Illustration from "../../assets/Login illustration.svg";
import Logo from "../../assets/Vector.svg"; // <-- add your logo

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-[667px]">
          <img
            src={Illustration}
            alt="Login Illustration"
            className="w-full h-auto rounded-2xl object-contain"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        {/* Main container */}
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          {/* ✅ Frame 1 (Logo + Text) */}
          <div className="w-full max-w-[350px] flex flex-col items-center gap-2">
            {/* Logo + App Name Row */}
            <div className="flex items-center gap-2 h-[48px]">
              <img src={Logo} alt="Logo" className="h-full w-auto" />
              <div className="text-[#464646] text-[26px] leading-[140%] font-normal">
                Nest app
              </div>
            </div>

            {/* Welcome Text Below */}
            <p className="text-[#2A2A2B] text-[20px] leading-[28px] font-semibold text-center w-full max-w-[211px]">
              Welcome to Nest App
            </p>
          </div>

          {/* Subframe 2: Form Area */}
          <div className="w-full max-w-[350px] flex flex-col gap-6">
            {/* Subframe 2.1: Top part of form (e.g., inputs) */}
            <div className="w-full flex flex-col gap-4">
              <div>
                <label className="font-medium text-[#555555] text-xs">Mobile no./ Email/ Client ID</label>
                <input
                  type="email"
                  placeholder="Enter Mobile no./Email"
                  className="w-full border text-sm border-[#ECEDEE] px-3 py-3 rounded"
                />
              </div>

              <div>
                <label className="font-medium text-[#555555] text-xs">Password/MPIN</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border text-sm border-[#ECEDEE] px-3 py-3 rounded"
                />
              </div>
            </div>

            {/* Subframe 2.2: Bottom part of form (e.g., button, links) */}
            <div className="w-full flex flex-col gap-3">
              <button className="w-full bg-black text-white p-3 rounded">
                Sign In
              </button>
              {/* Optional: Forgot password link, social login, etc. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
