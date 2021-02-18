import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

class DropdownCuisine extends React.Component {
  state = {
    cuisine: [
      "African",
      "American",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ],
    selectedCuisine: [],
  };

  onSelect = (selectedList, selectedItem) => {
    let newCuisineOption = selectedList.map((item) => item);
    this.props.updateCuisineOption(newCuisineOption);
    this.setState({ selectedCuisine: selectedList });
  };

  onRemove = (selectedList, selectedItem) => {
    let newCuisineOption = selectedList.map((item) => item);
    this.props.updateCuisineOption(newCuisineOption);
    this.setState({ selectedCuisine: selectedList });
  };

  render() {
    return (
      <div>
        <Multiselect
          options={this.state.cuisine}
          selectedValues={this.state.selectedCuisine}
          onSelect={this.onSelect}
          onRemove={this.onRemove}
          displayValue={this.state.cuisine}
          value={this.state.cuisine}
          name="selectedCuisine"
          isObject={false}
        />
      </div>
    );
  }
}

export default DropdownCuisine;
