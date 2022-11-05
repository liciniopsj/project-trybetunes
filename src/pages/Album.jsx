import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    getMusicsResults: [],
    artistInfo: '',
    chkboxFavorite: {},
    display: 'show',
    showLoadingText: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    // const { chkboxFavorite } = this.state;
    const getMusicsResults = await getMusics(id);
    const artistInfo = getMusicsResults[0];
    this.showLoadingScreen();
    const favorites = await getFavoriteSongs();
    // console.log(favoriteSongs);
    this.setState({
      getMusicsResults,
      artistInfo,
    });
    // console.log(favorites);
    this.handleFavoriteChkBoxes(favorites);
  }

  componentDidUpdate() {
    // console.log(this.state);
  }

  handleFavoriteChkBoxes = (favorites) => {
    favorites.forEach((song) => {
      this.setState((prev) => ({
        chkboxFavorite: { ...prev.chkboxFavorite, [song.trackName]: true },
      }));
    });
  };

  showLoadingScreen = () => {
    const LOADTIME = 500;
    this.setState({ display: 'hidden', showLoadingText: true });
    setTimeout(() => {
      this.setState({ display: 'visible', showLoadingText: false });
    }, LOADTIME);
  };

  // handleSaveSong = async (alt) => {
  //   const { getMusicsResults } = this.state;
  //   const slicedResults = getMusicsResults.slice(1);
  //   const selectedTrack = slicedResults.find((track) => track.trackId === +alt);
  //   this.showLoadingScreen();
  //   await addSong(selectedTrack);
  // };

  // handleRemoveSong = async (alt) => {
  //   const { getMusicsResults } = this.state;
  //   const slicedResults = getMusicsResults.slice(1);
  //   const selectedTrack = slicedResults.find((track) => track.trackId === +alt);
  //   this.showLoadingScreen();
  //   await removeSong(selectedTrack);
  // };

  handleFavoriteMusic = async (event) => {
    const { name, checked, alt } = event.target;
    this.setState((prev) => ({
      chkboxFavorite: { ...prev.chkboxFavorite, [name]: checked },
    }));
    // console.log(this.state);
    const { getMusicsResults } = this.state;
    const slicedResults = getMusicsResults.slice(1);
    const selectedTrack = slicedResults.find((track) => track.trackId === +alt);
    // this.showLoadingScreen();
    if (checked) await addSong(selectedTrack);
    if (!checked) await removeSong(selectedTrack);
  };

  render() {
    const { match } = this.props;
    const { id } = match.params;
    const { getMusicsResults,
      artistInfo,
      display,
      chkboxFavorite,
      showLoadingText,
    } = this.state;
    const { artistName, collectionName } = artistInfo;
    const musicCardList = getMusicsResults.slice(1);
    // const albumHTMLContent = (
    // );
    return (
      <div>
        { showLoadingText ? <Loading /> : null}
        <div style={ { visibility: `${display}` } } data-testid="page-album">
          <Header />
          <p>{ `Album ${id}` }</p>
          <div>
            <img src={ artistInfo.artworkUrl100 } alt="Album Cover" />
            <h3 data-testid="artist-name">{artistName}</h3>
            <h4 data-testid="album-name">{collectionName}</h4>
          </div>
          {musicCardList.map((track) => (
            <div key={ track.trackId }>
              <MusicCard
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
                trackInfo={ track }
                showLoadingScreen={ this.showLoadingScreen }
                handleFavoriteMusic={ this.handleFavoriteMusic }
                chkboxFavorite={ chkboxFavorite[track.trackName] }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
