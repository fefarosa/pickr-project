import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/pickaxe.png";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar">
        <Link to={"/"}>
          <img className="logo-navbar" src={logo} alt="Pickr Logo" />
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
