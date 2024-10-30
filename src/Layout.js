import "./index.css";

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="header-container">
        <div>Project Name</div>
        <ul className="nav-container">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
