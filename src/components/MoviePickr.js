import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DropdownGenre from "./DropdownGenre";

class MoviePickr extends React.Component {
  state = {
    moviesList: [],
    moviesListCopy: [],
    randomMoviesList: [],
    selectedGenre: "",
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.selectedGenre !== this.state.selectedGenre) {
      try {
        const response = await axios.get(
          // `https://api.themoviedb.org/3/discover/movie/?api_key=6d346ab1b31a14c5c66edf43c9a2623c&with_genres=35`
          `https://api.themoviedb.org/3/discover/movie/?api_key=6d346ab1b31a14c5c66edf43c9a2623c&with_genres=${this.state.selectedGenre}`
        );
        this.setState({
          moviesList: [...response.data.results],
          moviesListCopy: [...response.data.results],
        });
        this.handleRandom();
      } catch (err) {
        console.error(err);
      }
    }
  };

  handleChange = (event) => {
    console.log("evento do moviepickr");
    this.setState({
      selectedGenre: event.target.value,
    });
  };

  handleRandom = () => {
    let randomArr = [];
    for (let i = 0; i < 5; i++) {
      randomArr.push(
        this.state.moviesList[
          Math.floor(Math.random() * this.state.moviesList.length)
        ]
      );
    }
    this.setState({ randomMoviesList: randomArr });
  };

  render() {
    console.log(this.state.randomMoviesList);
    return (
      <div>
        <Navbar />
        <div>
          <h1>Your filters</h1>
          <DropdownGenre
            handleChange={this.handleChange}
            selectedGenre={this.state.selectedGenre}
          />
          <div>
            <ul>
              {this.state.randomMoviesList.map((element) => {
                return <li key={element.id}>{element.title}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviePickr;
