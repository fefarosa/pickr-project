import React from "react";
import { Link } from "react-router-dom";
import logoFull from "../images/logo_full.png";
import "./Homepage.css";

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <div
          id="background"
          className="d-flex flex-column align-items-center"
        >
          <img id="img" src={logoFull} alt="Pickr Logo" />
          <h2 className="header">For the indecisive minds</h2>
          <h4>Still deciding what to watch?</h4>
          <h4>We will help you decide!</h4>
          <div className="container">
            <Link to="/moviepickr">
                <div className="card bg-light mb-3 pe-auto">
                <div id="text" className="card-body">
                  <i className="fas fa-film fa-5x"></i>
                  <h3>Movie pickr</h3>
                  <p className="card-text">
                    Start here.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
