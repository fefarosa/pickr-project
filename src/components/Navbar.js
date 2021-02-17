import React from "react";
import { Link } from "react-router-dom";
// import logoName from "../images/logo_text.png";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar bg-light d-flex justify-content-center">
        <Link to={"/"}>
          <i id="icon" className="fas fa-home fa-1x pe-auto"></i>
          {/* <img id="img" className="pe-auto" src={logoName} alt="Pickr Logo" /> */}
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
