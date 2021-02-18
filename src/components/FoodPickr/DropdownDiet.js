import React from "react";

class DropdownDiet extends React.Component {
  state = {
    diet: [
      "Gluten Free",
      "Ketogenic",
      "Vegetarian",
      "Lacto-Vegetarian",
      "Ovo-Vegetarian",
      "Vegan",
      "Pescetarian",
      "Paleo",
      "Primal",
      "Whole30",
    ],
    selectedDiet: [],
  };
  handleChangeDiet = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <select
        onChange={this.props.handleChange}
        value={this.props.selectedDiet}
        name="selectedDiet"
        className="btn btn-light"
        style={{ width: 200 }}
      >
        <option disabled hidden></option>
        {this.state.diet.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    );
  }
}

export default DropdownDiet;
