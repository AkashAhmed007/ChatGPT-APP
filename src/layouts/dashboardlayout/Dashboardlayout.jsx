import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardlayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
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
    <div>
      <div>MENU</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboardlayout;
