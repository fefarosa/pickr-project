import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/pickaxe.png";
import "./Homepage.css";

class Homepage extends React.Component {
  render() {
    return (
      <div className="body">
      <img src={logo} alt="logo" />
      <div className="container">
      <p className="title">pickr.</p><p className="slogan">for the indecisive minds.</p>
      <Link to="/moviepickr">
                
            </Link>
      </div>
        {/* <div id="text" className="card-body">
          <div className="container-box-link">
              <div className="card bg-light mb-3 pe-auto">
                  <i className="fas fa-film fa-5x"></i>
                  <h3>Movie pickr</h3>
                  <p className="card-text">Start here.</p>
              </div> */}
            
          
        </div>
      
    );
  }
}

export default Homepage;
