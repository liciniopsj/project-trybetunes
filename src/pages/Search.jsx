import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchInput: '',
    buttonStatus: true,
  };

  handleButtonDisableToggle = () => {
    const { searchInput } = this.state;
    const INPUT_MIN_SIZE = 2;
    const inputLenghtValidation = searchInput.length >= INPUT_MIN_SIZE;
    this.setState({
      buttonStatus: !inputLenghtValidation,
    });
  };

  handleSearchButton = (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    console.log(searchInput);
    this.setState({
      searchInput: '',
    });
  };

  handleSearchInput = (event) => {
    const { value } = event.target;
    // console.log(value);

    this.setState({
      searchInput: value,
    }, this.handleButtonDisableToggle);
  };

  render() {
    const { searchInput, buttonStatus } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="search"
          name="searchArtist"
          id="searchArtist"
          placeholder="Nome do Artista"
          value={ searchInput }
          onChange={ this.handleSearchInput }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          onClick={ this.handleSearchButton }
          disabled={ buttonStatus }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
