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
      {/* <div>
        <NavbarFood />
        <div className="body">
          <h1 className="filter-title">
            filter your meal
            <br />
            by cuisine, diet & meal type.
          </h1>
          <p className="explanation">
            choose your preferred genres and language and get up to five random
            movie recommendations.
          </p>
          <p className="explanation">select your preferred cuisine:</p>
          <DropdownCuisine updateCuisineOption={this.updateCuisineOption} />
          <p className="explanation">select your preferred diet:</p>
          <DropdownDiet handleChange={this.handleChange} selectedDiet={this.state.selectedDiet}
          />
          <p className="explanation">select your preferred meal type:</p>
          <DropdownMealType handleChange={this.handleChange} selectedMealType={this.state.selectedMealType}
          />
        {this.state.searchSucess ? (
          <div>
            {this.state.randomFoodList.map((element) => {
              return (
                <div className="movie-items" key={element.id}>
                  <img className="food-image"
                        src={
                          element.image ? element.image : "../../images/pickaxe.png"
                        }
                        alt="Pic of the food"
                      />

                  <div className="food-info">
                      <h3>
                        <p className="food-title">
                        {element.title}
                        </p>
                        <a></a>
                      </h3>
                      
                    
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p>There are no results available.</p>
          </div>
        )}
      </div> */}
    );
  }
}

export default FoodPickr;
