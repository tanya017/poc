import header from "../../assets/Vector.svg";
import sideCard from "../../assets/Login illustration.svg";
import { useState } from "react";
import Form from "./components/Form";
import Otp from "./components/Otp";

function Login() {
  const [activeTab, setActiveTab] = useState("login");

  const renderTab = () => {
    switch (activeTab) {
      case "login":
        return <Form onLoginSuccess={() => setActiveTab("otp")}/>;
      case "otp":
        return <Otp />;
      default:
        return <Form onLoginSuccess={() => setActiveTab("otp")}/>;
    }
  };

  return (
    // min-h-screen ensures the background covers the whole page
    // items-center centers the two blocks vertically if the screen is tall
    <div className="flex flex-wrap min-h-screen items-center justify-center gap-4 bg-gray-50 p-4">
      {/* Left Side: Illustration */}
      {/* Added 'hidden md:block' if you want to hide the image on very small phones */}
      <div className="flex-1 w-full max-w-178.75 flex justify-center">
        <img
          src={sideCard}
          alt="Login illustration"
          className="w-full h-auto hidden md:block object-contain"
        />
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 items-center w-full max-w-181.25">
        <div className="max-w-87.5">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <img src={header} alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-lg">Nest App</span>
            </div>
            <h1 className="font-semibold text-2xl text-gray-800">
              Welcome to Nest app
            </h1>
          </div>

          {/* Form Tab */}
          <div>
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
