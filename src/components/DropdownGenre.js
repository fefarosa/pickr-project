import React from "react";
import axios from "axios";

class DropdownGenre extends React.Component {
  state = {
    genres: [],
    selectedGenre: this.props.selectedGenre,
  };
  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6d346ab1b31a14c5c66edf43c9a2623c&language=en-US"
      );
      this.setState({
        genres: response.data.genres,
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    console.log(this.state.genresCopy);
    return (
      <select
        onChange={this.props.handleChange}
        value={this.props.selectedGenre}
        name="selectedGenre"
      >
        <option disabled hidden></option>
        {this.state.genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    );
  }
}

export default DropdownGenre;
