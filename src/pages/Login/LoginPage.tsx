// import header from "../../assets/Vector.svg";
import sideCard from "../../assets/Login illustration.svg";
import Form from "./components/Form";
import Otp from "./components/Otp";
import Header from "./components/Header";
import ForgotPassword from "./components/Forgot";
import { useAuthStore } from "../../store/useAuthStore";
import SetPassword from "./components/SetPassword";
import Unblock from "./components/Unblock";

function LoginPage() {
  const activeTab = useAuthStore((state) => state.activeTab);
  const header = useAuthStore((state) => state.header);

  const renderHeader = () => {
    switch (header) {
      case "login":
        return <Header label="Welcome to Nest App" />;
      case "forgotPass":
        return <Header label="Nest App" />;
      case "forgotPassOtp":
        return <Header label="Forgot Password !" />;
      case "set-password":
        return <Header label="Set Password" />;
      default:
        return <Header label="Welcome to Nest App" />;
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "login":
        return <Form />;
      case "otp":
        return <Otp />;
      case "forgotPass":
        return <ForgotPassword />;
      case "forgotPassOtp":
        return <Otp />;
      case "set-password":
        return <SetPassword />;
      case "unblock-user":
        return <Unblock />
      default:
        return <Form />;
    }
  };

  return (
    // <div className="flex flex-col-reverse lg:flex-row min-h-screen items-center justify-start pt-16 sm:pt-20 lg:justify-center lg:pt-0 gap-8 md:gap-12 lg:gap-16 bg-gray-50 p-4">
    <div className="flex flex-col-reverse lg:flex-row min-h-screen items-center justify-start pt-16 sm:pt-20 lg:justify-center lg:pt-0 gap-8 md:gap-12 lg:gap-16 bg-gray-50 p-4">
      {/* Left Side: Illustration */}
      {/* <div className="flex-1 w-full max-w-178.75 flex justify-center"> */}
      {/* <div className="w-[667px] h-[890px] opacity-100 rotate-0 rounded-[24px] overflow-hidden"> */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-hidden">
        <div className='w-full max-w-[667px]'>
          <img
            src={sideCard}
            alt="Login illustration"
            // className="w-full h-auto hidden md:block object-contain"
            className="w-full h-auto hidden lg:block object-contain"
            // className="w-[667px] h-[890px] rounded-[24px] opacity-100 object-cover"
            // className="w-full h-auto rounded-2xl object-contain"
          />
        </div>
      </div>

      {/* Right Side: Form */}
      {/* <div className="flex flex-col gap-16 flex-1 items-center w-full max-w-181.25"> */}
      {/* <div className="flex flex-col gap-16 flex-1 items-center w-full max-w-2xl"> */}
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 flex-1 items-center w-full max-w-[725px]">
        {/* <div className="flex flex-col w-full max-w-87.5 h-auto gap-2"> */}
        <div className="flex flex-col w-full max-w-md h-auto gap-2">
          {renderHeader()}
        </div>

        {/* Form Tab */}
        {/* <div className="w-full max-w-[350px] min-h-[327px] mx-auto"> */}
        <div className="w-full max-w-[350px] sm:max-w-[400px] min-h-[327px] mx-auto">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
