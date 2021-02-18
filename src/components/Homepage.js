import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/pickaxe.png";
import "./Homepage.css";

class Homepage extends React.Component {
  render() {
    return (
      <div className="body">
        <img className="logo-homepage" src={logo} alt="logo" />
        <div className="container">
          <p className="title">pickr.</p>
          <p className="slogan">for the indecisive minds.</p>
        <div className="links">
          <Link to="/moviepickr" style={{ textDecoration: 'none' }}>
            <p className="start movie">Find out what movie to watch today here.</p>
          </Link>
          <Link to="/foodpickr" style={{ textDecoration: 'none' }}>
            <p className="start food">Find out what to cook today here.</p>
          </Link>
        </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
