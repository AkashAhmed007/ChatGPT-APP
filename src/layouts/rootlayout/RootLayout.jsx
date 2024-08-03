import { Link, Outlet } from "react-router-dom";
import "./rootlayout.css";
function RootLayout() {
  return (
    <div className="rootlayout">
      <header>
        <Link to='/'  className="logo">
          <img src="/logo.PNG" alt="" />
          <span>RESMI AI</span>
        </Link>
        <div className="user">User</div>
      </header>

      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default RootLayout;
