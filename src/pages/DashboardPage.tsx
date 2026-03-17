import { useNavigate } from "react-router-dom";
import header from "../assets/Vector.svg";
import { useAuthStore } from "../store/useAuthStore";

function Dashboard() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex-col items-center text-center">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img src={header} alt="Logo" className="w-16 h-16 " />
            <span className="font-normal text-4xl">NT Web</span>
          </div>
        </div>

        <h1 className="font-semibold text-2xl text-gray-800">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
