import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    searchInput: '',
    buttonStatus: true,
    showLoadingScreen: false,
    albumList: [],
    searchedArtist: '',
    isAlbumListBlank: false,
  };

  showLoadingScreen = () => {
    const LOADTIME = 1500;
    this.setState({ showLoadingScreen: true });
    setTimeout(() => {
      this.setState({ showLoadingScreen: false });
    }, LOADTIME);
  };

  handleButtonDisableToggle = () => {
    const { searchInput } = this.state;
    const INPUT_MIN_SIZE = 2;
    const inputLenghtValidation = searchInput.length >= INPUT_MIN_SIZE;
    this.setState({
      buttonStatus: !inputLenghtValidation,
    });
  };

  checkBlankAlbumList = (searchResult) => searchResult.length === 0;

  buildArtistAlbumList = (searchResult) => {
    const albumList = searchResult.map((album) => (
      <div key={ album.collectionId }>
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt="Album cover" />
          <h4>{ album.collectionName }</h4>
          <h6>{ album.artistName }</h6>
        </Link>
      </div>
    ));
    return albumList;
  };

  handleSearchButton = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    // console.log(searchInput);
    this.showLoadingScreen();
    const searchResult = await searchAlbumsAPI(searchInput);
    const isAlbumListBlank = this.checkBlankAlbumList(searchResult);
    const builtAlbumList = this.buildArtistAlbumList(searchResult);
    // const artistName = searchInput;
    // console.log(searchResult);
    this.setState({
      searchedArtist: `Resultado de álbuns de: ${searchInput}`,
      searchInput: '',
      albumList: builtAlbumList,
      isAlbumListBlank,
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
    const {
      searchInput,
      buttonStatus,
      albumList,
      showLoadingScreen,
      isAlbumListBlank,
      searchedArtist } = this.state;

    const blankAlbumListHTML = (
      <h2>Nenhum álbum foi encontrado</h2>
    );

    const albumListHTML = (
      <div>
        <p>{ searchedArtist }</p>
        {albumList}
      </div>
    );

    const searchHTMLContent = (
      <>
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
        { isAlbumListBlank ? blankAlbumListHTML : albumListHTML }
      </>);

    return (
      <div data-testid="page-search">
        <Header />
        { showLoadingScreen ? <Loading /> : searchHTMLContent }
      </div>
    );
  }
}

export default Search;
