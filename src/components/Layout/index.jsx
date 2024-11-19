import { useEffect } from "react";
import { usePokes } from "../../atom/pokes";
import "./index.css";

import { Link, Outlet } from "react-router-dom";
import runService from "../../service/HttpSerivce";

const Layout = () => {
  const { setPokes } = usePokes();

  useEffect(() => {
    runService.get("poke.json").then((res) => setPokes(res.data));
  }, [setPokes]);

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
          <li>
            <Link to="/survey">Survey</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
