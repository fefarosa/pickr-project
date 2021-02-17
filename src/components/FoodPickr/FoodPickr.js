import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DropdownCuisine from "./DropdownGenre";
import DropdownDiet from "./DropdownLang";
import DropdownMealType from "./DropdownMealType";

class FoodPickr extends React.Component {
  state = {
    foodList: [],
    foodListCopy: [],
    randomMoviesList: [],
    selectedCuisine: "",
    selectedDiet: "",
    selectedType: "",
    hasChanged: false,
    searchSucess: true,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.selectedCuisine !== this.state.selectedCuisine ||
      prevState.selectedDiet !== this.state.selectedDiet ||
      prevState.selectedType !== this.state.selectedType
    ) {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${this.state.selectedCuisine}&diet=${this.state.selectedDiet}&type=${this.state.selectedType}&apiKey=d7779335b0a443e6a4a0f92028acc7e9`
        );
        this.setState({
          foodList: [...response.data.results],
          foodListCopy: [...response.data.results],
        });
        this.handleRandom();
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
      this.setState({ randomMoviesList: emptyArr, searchSucess: false });
    } else {
      this.setState({ randomMoviesList: randomArr, searchSucess: true });
    }
  };

  render() {
    console.log(this.state.randomMoviesList);
    return (
      <div>
        <Navbar />
        <div>
          <h1>Your filters</h1>
          <div>
            <h5>
              <strong>Select cuisine:</strong>
            </h5>
            <DropdownGenre
              handleChange={this.handleChange}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div>
            <h5>
              <strong>Select language:</strong>
            </h5>
            <DropdownLang
              handleChange={this.handleChange}
              selectedLang={this.state.selectedLang}
            />
          </div>
          {this.state.searchSucess ? (
            <div>
              {this.state.randomMoviesList.map((element) => {
                return (
                  <div className="movie-items" key={element.id}>
                    <ul>
                      <li>
                        <img
                          src={
                            element.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${element.poster_path}`
                              : "../images/keep-calm-poster-not-found.png"
                          }
                          alt="Poster"
                        />
                        {element.title}
                      </li>
                    </ul>
                  </div>
                );
                {
                  /*return <li key={element.id}>{element.title}</li>;*/
                }
              })}
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

export default FoodPickr;
