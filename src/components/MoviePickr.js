import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DropdownGenre from "./DropdownGenre";
import DropdownLang from "./DropdownLang";

class MoviePickr extends React.Component {
  state = {
    moviesList: [],
    moviesListCopy: [],
    randomMoviesList: [],
    selectedGenre: "",
    selectedLang: "",
    hasChanged: false,
    searchSucess: true,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.hasChanged) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie/?api_key=6d346ab1b31a14c5c66edf43c9a2623c&with_genres=${this.state.selectedGenre}&with_original_language=${this.state.selectedLang}`
        );
        this.setState({ hasChanged: false });
        if (!response.data.results.length) {
          this.setState({ searchSuccess: false });
        } else {
          this.setState({
            moviesList: [...response.data.results],
            moviesListCopy: [...response.data.results],
            searchSucess: true,
          });
          this.handleRandom();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      hasChanged: true,
    });
  };

  handleRandom = () => {
    let emptyArr = [];
    let n = 5;
    let list = this.state.moviesList;
    const copy = Array.from(list);
    let randomArr = Array.from(
      Array(n),
      () => copy.splice(Math.floor(Math.random() * copy.length), 1)[0]
    );
    if (this.state.moviesList.length <= 5 && this.state.moviesList.length > 0) {
      this.setState({ randomMoviesList: this.state.moviesList });
    } else if (!this.state.moviesList.length) {
      this.setState({ randomMoviesList: emptyArr, searchSucess: false});
    } else {
      this.setState({ randomMoviesList: randomArr });
    }
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
          <DropdownLang
            handleChange={this.handleChange}
            selectedLang={this.state.selectedLang}
          />
          {this.state.searchSucess ? (
            <div>
              <ul>
                {this.state.randomMoviesList.map((element) => {
                  return <li key={element.id}>{element.title}</li>;
                })}
              </ul>
            </div>
          ) : (
            <div>
              <p>There are no results available.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MoviePickr;
