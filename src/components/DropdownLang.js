import React from "react";
import axios from "axios";

class DropdownLang extends React.Component {
  state = {
    languages: [],
    languagesCopy: [],
    selectedLang: this.props.selectedLang,
  };
  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/configuration/languages?api_key=6d346ab1b31a14c5c66edf43c9a2623c"
      );
      let array = [...response.data];
      let sorted = array.sort((a, b) =>
        a.english_name.localeCompare(b.english_name)
      );
      this.setState({
        languages: sorted,
        languagesCopy: [...response.data],
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleChangeLang = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <select
        onChange={this.props.handleChange}
        value={this.props.selectedLang}
        name="selectedLang"
      >
        <option disabled hidden></option>
        {this.state.languages.map((language) => (
          <option key={language.iso_639_1} value={language.iso_639_1}>
            {language.english_name}
          </option>
        ))}
      </select>
    );
  }
}

export default DropdownLang;
