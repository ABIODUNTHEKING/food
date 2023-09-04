import logo from "../images/logo.jpeg";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const SideBar = () => {
  let activeLink = {
    backgroundColor: "rgba(0, 0, 0, 0.37)",
  };

  return (
    <header className="side-bar-header">
      <img src={logo} alt="logo" className="logo" />
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              end
              className="nav-link"
              state={"Profile"}
              style={({ isActive }) => (isActive ? activeLink : null)}
            >
              <p>
                <i className="fa-solid fa-user"></i>{" "}
                {window.innerWidth >= 700 && "Profile"}
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className="nav-link"
              state={"Menu"}
              style={({ isActive }) => (isActive ? activeLink : null)}
            >
              <p id="first-link">
                <i className="fa-solid fa-cart-shopping"></i>{" "}
                {window.innerWidth >= 700 && "Menu"}
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SideBar;
