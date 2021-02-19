import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/pickaxe.png";
import "./NavbarMovie.css";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar">
        <div className="homepage">
          <Link to={"/"}>
            <img className="logo-navbar" src={logo} alt="Pickr Logo" />
          </Link>
        </div>
        <div className="movie-food">
          <Link to={"/foodpickr"}>
            <i className="fas fa-utensils fa-2x"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
