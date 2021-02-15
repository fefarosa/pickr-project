import React from "react";
import Navbar from "./Navbar";
import axios from "axios";

class MoviePickr extends React.Component {
  state = {};

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "http://api.gowatchit.com/api/v2/movies/categories"
      );
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default MoviePickr;
