import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ isLoggedIn, logOutUser }) => {
  // for toggling the Nav bar
  const ToggleNav = () => {
    document.querySelector(".nav_link").classList.toggle("nav-active");
    document.querySelector(".bars").classList.toggle("toogle");
  };

  return (
    <>
      <nav>
        <h2 className="nav_title">MERN App</h2>
        <ul className="nav_link">
          <li>
            <NavLink activeClassName="nav_link_active_class" exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav_link_active_class" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="nav_link_active_class" to="/contact">
              Contact
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink activeClassName="nav_link_active_class" to="/users">
                  Users
                </NavLink>
              </li>
              <li>
                <button
                  style={{
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    background: "none",
                    fontSize: "1.1rem",
                  }}
                  onClick={logOutUser}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink activeClassName="nav_link_active_class" to="/login">
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="nav_link_active_class" to="/signup">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {/* the burger icon */}
        <div className="bars" onClick={ToggleNav}>
          <div className="line1 line"></div>
          <div className="line2 line"></div>
          <div className="line3 line"></div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
