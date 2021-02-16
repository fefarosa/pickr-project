import React from "react";
import Navbar from "./Navbar";
import axios from "axios";

class MoviePickr extends React.Component {
  state = {
    moviesList: [],
    moviesListCopy: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie/?api_key=6d346ab1b31a14c5c66edf43c9a2623c&with_genres=35`
        // `https://api.themoviedb.org/3/discover/movie/?api_key=6d346ab1b31a14c5c66edf43c9a2623c&with_genres=${this.props.match.params.genre_id}&with_original_language=${this.props.match.params.original_language}&region=${this.props.match.params.region}`
      );
      this.setState({
        moviesList: [...response.data.results],
        moviesListCopy: [...response.data.results],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };



  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h1>Your filters</h1>
          <form>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Genre
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {/* {this.state.moviesListCopy.map((element) => {
                return (
                  <option value={element.genre_ids} className="dropdown-item">
                    {element.genre_name}
                  </option>
                );
              })} */}
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MoviePickr;
