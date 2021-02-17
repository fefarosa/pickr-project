import React from "react";

class DropdownMealType extends React.Component {
  state = {
    mealType: [
      "Appetizer",
      "Beverage",
      "Bread",
      "Breakfast",
      "Dessert",
      "Drink",
      "Fingerfood",
      "Main Course",
      "Marinade",
      "Salad",
      "Sauce",
      "Side Dish",
      "Snack",
      "Soup",
    ],
    selectedMealType: [],
  };
  handleChangeMealType = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <select
        onChange={this.props.handleChange}
        value={this.props.selectedMealType}
        name="selectedMealType"
      >
        <option disabled hidden></option>
        {this.state.mealType.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    );
  }
}

export default DropdownMealType;
