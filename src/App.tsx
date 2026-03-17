import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { preAuth } from "./api/auth.api";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {

  const [auth, setAuth] = useState(false);
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    const init = async() => {
      const success = await preAuth();
      if(success) {
        setAuth(true);
      } else {
        console.log("PreAuth handshake failed");
      }
    }
    init();
  },[]);

  if(!auth) return (<div>Loading....</div>);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={accessToken ? <Dashboard/> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
