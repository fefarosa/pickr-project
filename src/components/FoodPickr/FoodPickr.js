import React from "react";
import NavbarFood from "./NavbarFood";
import axios from "axios";
import DropdownCuisine from "./DropdownCuisine";
import DropdownDiet from "./DropdownDiet";
import DropdownMealType from "./DropdownMealType";
import "./FoodPickr.css";

class FoodPickr extends React.Component {
  state = {
    foodList: [],
    foodListCopy: [],
    randomFoodList: [],
    selectedDiet: "",
    selectedMealType: "",
    searchSucess: true,
    cuisineOption: "",
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.cuisineOption !== this.state.cuisineOption ||
      prevState.selectedDiet !== this.state.selectedDiet ||
      prevState.selectedMealType !== this.state.selectedMealType
    ) {
      try {
        console.log("didupdate triggered");
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${this.state.cuisineOption}&diet=${this.state.selectedDiet}&type=${this.state.selectedMealType}&apiKey=d7779335b0a443e6a4a0f92028acc7e9`
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

  updateCuisineOption = (selectedList) => {
    this.setState({ cuisineOption: selectedList.join(",") });
    console.log(this.state.cuisineOption);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRandom = () => {
    let emptyArr = [];
    let n = 5;
    let list = this.state.foodList;
    const copy = Array.from(list);
    let randomArr = Array.from(
      Array(n),
      () => copy.splice(Math.floor(Math.random() * copy.length), 1)[0]
    );
    if (this.state.foodList.length <= 5 && this.state.foodList.length > 0) {
      this.setState({ randomFoodList: this.state.foodList });
    } else if (!this.state.foodList.length) {
      this.setState({ randomFoodList: emptyArr, searchSucess: false });
    } else {
      this.setState({ randomFoodList: randomArr, searchSucess: true });
    }
  };

  render() {
    return (
      <div>
        <NavbarFood />
        <div className="body">
          <div className="d-flex align-items-center justify-content-end mr-5">
            <h1 className="filter-title">
              filter your food
              <br />
              by cuisine, diet & meal type.
            </h1>
            <p className="explanation">
              and get up to five random meal recommendations
            </p>
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column align-items-center mr-2 ml-2">
              <h5>
                <strong>Select cuisine:</strong>
              </h5>
              <DropdownCuisine updateCuisineOption={this.updateCuisineOption} />
            </div>
            <div className="d-flex flex-column align-items-center mr-2 ml-2">
              <h5>
                <strong>Select diet:</strong>
              </h5>
              <DropdownDiet
                handleChange={this.handleChange}
                selectedDiet={this.state.selectedDiet}
              />
            </div>
            <div className="d-flex flex-column align-items-center mr-2 ml-2">
              <h5>
                <strong>Select meal type:</strong>
              </h5>
              <DropdownMealType
                handleChange={this.handleChange}
                selectedMealType={this.state.selectedMealType}
              />
            </div>
          </div>
          {this.state.searchSucess ? (
            <div>
              {this.state.randomFoodList.map((element) => {
                return (
                  <div className="food-items food-info food-container" key={element.id}>
                    <ul>
                      <div className="food-container">
                        <li className="list-style">
                          <img
                            className="food-img"
                            src={
                              element.image
                                ? element.image
                                : "../images/keep-calm-poster-not-found.png"
                            }
                            alt="Pic of the food"
                          />
                          {element.title}
                        </li>
                      </div>
                    </ul>
                  </div>
                );
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
