// import header from "../../assets/Vector.svg";
import sideCard from "../../assets/Login illustration.svg";
import Form from "./components/Form";
import Otp from "./components/Otp";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import { useAuthStore } from "../../store/useAuthStore";

function Login() {

  const activeTab = useAuthStore((state) => state.activeTab);
  const setActiveTab = useAuthStore((state) => state.setActiveTab);

  const renderTab = () => {
    switch (activeTab) {
      case "login":
        return (
          <Form/>
        );
      case "otp":
        return <Otp />;
      case "forgotPass":
        return <ForgotPassword />;
      default:
        return (
          <Form/>
        );
    }
  };

  return (
    <div className="flex flex-wrap  min-h-screen items-center justify-center gap-2.5 bg-gray-50 p-4">

      {/* Left Side: Illustration */}
      {/* <div className="flex-1 w-full max-w-178.75 flex justify-center"> */}
      <div className="w-[667px] h-[890px] opacity-100 rotate-0 rounded-[24px] overflow-hidden">
        <img
          src={sideCard}
          alt="Login illustration"
          // className="w-full h-auto hidden md:block object-contain"
          className="w-[667px] h-[890px] rounded-[24px] opacity-100 object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="flex flex-col gap-16 flex-1 items-center w-full max-w-181.25">
        <div className="w-full max-w-87.5 h-auto">
          <Header
            label={activeTab === "forgotPass" ? "Nest App" : "Welcome to Nest"}
          />
        </div>

        {/* Form Tab */}
        <div className="w-full max-w-[350px] min-h-[350px] mx-auto">
          {renderTab()}
        </div>
      </div>

    </div>
  );
}

export default Login;
