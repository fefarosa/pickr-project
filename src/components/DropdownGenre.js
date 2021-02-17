import React from "react";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";

class DropdownGenre extends React.Component {
  state = {
    genres: [],
    selectedGenre: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6d346ab1b31a14c5c66edf43c9a2623c&language=en-US"
      );
      this.setState({ genres: response.data.genres });
    } catch (err) {
      console.error(err);
    }
  };

  onSelect = (selectedList, selectedItem) => {
    let newGenreId = selectedList.map((item) => item.id);
    this.props.updateGenreId(newGenreId);
    this.setState({ selectedGenre: selectedList });
  };

  onRemove = (selectedList, selectedItem) => {
    let newGenreId = selectedList.map((item) => item.id);
    this.props.updateGenreId(newGenreId);
    this.setState({ selectedGenre: selectedList });
  };

  render() {
    return (
      <div>
        <Multiselect
          options={this.state.genres}
          selectedValues={this.state.selectedGenre}
          onSelect={this.onSelect}
          onRemove={this.onRemove}
          displayValue="name"
          value={this.state.selectedGenre}
          name="selectedGenre"
        />
      </div>
    );
  }
}

export default DropdownGenre;
