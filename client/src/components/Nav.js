import React from "react";

const Nav = () => {
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
          <li> Home </li>
          <li> About </li>
          <li> Log In </li>
          <li> Register </li>
        </ul>

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
