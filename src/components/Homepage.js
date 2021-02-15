import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_full.png";

// const logo = new Image();
// logo.src = "../images/logo_full.png";

class Homepage extends React.Component {
  render() {
    return (
      <div className="center">
        <div className="d-flex justify-content-center align-items-center">
          <img
            className="figure-img img-fluid rounded"
            src={require("../images/logo_full.png")}
            alt="Pickr Logo"
          />
          <br />
          <h2>For the indecisive minds</h2>
        </div>
        <div className="container-fluid">
          <Link to="/moviepickr">
            <i className="fas fa-film fa-5x"></i>
            <h3>Movie Pickr</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Homepage;
