import "./index.css";

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container">
      <nav className="header-container">
        <div>POKE</div>
        <ul className="nav-container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
