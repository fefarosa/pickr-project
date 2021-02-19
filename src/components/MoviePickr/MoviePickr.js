import React from "react";
import NavbarMovie from "./NavbarMovie";
import axios from "axios";
import DropdownGenre from "./DropdownGenre";
import DropdownLang from "./DropdownLang";
import "./MoviePickr.css";

class MoviePickr extends React.Component {
  state = {
    moviesList: [],
    moviesListCopy: [],
    randomMoviesList: [],
    selectedLang: "",
    searchSucess: true,
    genreId: "",
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.genreId !== this.state.genreId ||
      prevState.selectedLang !== this.state.selectedLang
      //|| !this.state.genreId.length
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
      // } else if ( && prevState.genreId !== this.state.genreId) {
      //   this.setState({ genreId: "" });
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
        <NavbarMovie />
        <div className="body">
          <div className="title-page">
            <h1 className="filter-title">
              filter your movie
              <br />
              by genre & language.
            </h1>
            <p className="explanation">
              and get up to five random movie recommendations.
            </p>
          </div>
          <div className="filters">
            <div className="filter-boxes">
              <h5 className="filter-label">
                <strong>Select genre:</strong>
              </h5>
              <DropdownGenre updateGenreId={this.updateGenreId} />
            </div>
            <div className="filter-boxes">
              <h5 className="filter-label">
                <strong>Select language:</strong>
              </h5>
              <DropdownLang
                handleChange={this.handleChange}
                selectedLang={this.state.selectedLang}
              />
            </div>
          </div>
          {this.state.searchSucess ? (
            <div>
              {this.state.randomMoviesList.map((element) => {
                return (
                  <div className="movie-items" key={element.id}>
                    <img
                      className="movie-poster"
                      src={
                        element.poster_path
                          ? `https://image.tmdb.org/t/p/w200/${element.poster_path}`
                          : "https://www.flaticon.com/svg/vstatic/svg/2688/2688796.svg?token=exp=1613739938~hmac=a4757cd9d6578d7078aaa90f110b14fb"
                      }
                      alt="Poster"
                    />
                    <div className="movie-info">
                      <h3>
                        <span className="movie-title">
                          {element.name || element.title
                            ? `${element.name || element.title}`
                            : element.original_title}
                          {!element.vote_average
                            ? ""
                            : " | " + element.vote_average + " ★"}
                        </span>
                      </h3>
                      <p className="movie-overview">{element.overview}</p>
                      <p className="movie-year">
                        Release year: {element.release_date.slice(0, 4)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="notfound-info">
              <p>there are no results available.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MoviePickr;
