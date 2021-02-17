import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DropdownGenre from "./DropdownGenre";
import DropdownLang from "./DropdownLang";
import "./MoviePickr.css";
import logoFull from "../images/logo_full.png";

class MoviePickr extends React.Component {
  state = {
    moviesList: [],
    moviesListCopy: [],
    randomMoviesList: [],
    selectedGenre: "",
    selectedLang: "",
    searchSucess: true,
    genreId: "",
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.genreId !== this.state.genreId ||
      prevState.selectedLang !== this.state.selectedLang
    ) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie/?api_key=6d346ab1b31a14c5c66edf43c9a2623c&with_genres=${this.state.genreId}&with_original_language=${this.state.selectedLang}`
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

  updateGenreId = (selectedList) => {
    this.setState({ genreId: selectedList.join(",") });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
      this.setState({ randomMoviesList: emptyArr, searchSucess: false });
    } else {
      this.setState({ randomMoviesList: randomArr, searchSucess: true });
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h1>
            FILTER YOUR MOVIE
            <i className="fal fa-popcorn"></i>
          </h1>
          <DropdownGenre updateGenreId={this.updateGenreId} />
          <DropdownLang
            handleChange={this.handleChange}
            s
            selectedLang={this.state.selectedLang}
          />
          {this.state.searchSucess ? (
            <div>
              {this.state.randomMoviesList.map((element) => {
                return (
                  <div className="movie-items" key={element.id}>
                    <img
                      src={
                        element.poster_path
                          ? `https://image.tmdb.org/t/p/w200/${element.poster_path}`
                          : "https://sd.keepcalms.com/i-w600/keep-calm-poster-not-found.jpg"
                      }
                      alt="Poster"
                    />
                    <div className="movie-info">
                      <h3>
                        <span>
                          {element.name || element.title
                            ? `${element.name || element.title}`
                            : element.original_title}{" "}
                          | {element.vote_average} ★
                        </span>
                      </h3>
                      <hr />
                      <p>{element.overview}</p>
                      <p>
                        Language: {element.original_language} | Date:
                        {element.release_date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p>
                There are no results available. <i class="fas fa-sad-tear"></i>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MoviePickr;
