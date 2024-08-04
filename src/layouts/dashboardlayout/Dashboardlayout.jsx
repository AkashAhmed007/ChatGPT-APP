import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardlayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../../components/ChatList";
function Dashboardlayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded, navigate]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="dashboardlayout">
      <div className="menu"><ChatList/></div>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboardlayout;
