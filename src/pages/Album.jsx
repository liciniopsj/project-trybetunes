import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    getMusicsResults: [],
    artistInfo: '',
    chkboxFavorite: [],
    display: 'show',
    showLoadingText: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const getMusicsResults = await getMusics(id);
    const artistInfo = getMusicsResults[0];
    // console.log(getMusicsResults);
    this.setState({
      getMusicsResults,
      artistInfo,
    });
  }

  showLoadingScreen = () => {
    const LOADTIME = 1000;
    this.setState({ display: 'hidden', showLoadingText: true });
    setTimeout(() => {
      this.setState({ display: 'visible', showLoadingText: false });
    }, LOADTIME);
  };

  handleFavoriteMusic = async (event) => {
    const { name, checked, alt } = event.target;
    const { getMusicsResults } = this.state;
    this.setState({
      [name]: checked,
    });
    const slicedResults = getMusicsResults.slice(1);
    // console.log(slicedResults);
    // console.log(alt);
    const selectedTrack = slicedResults.find((track) => track.trackId === +alt);
    // console.log(selectedTrack);
    this.showLoadingScreen();
    await addSong(selectedTrack);
  };

  render() {
    const { match } = this.props;
    const { id } = match.params;
    const { getMusicsResults,
      artistInfo,
      display,
      showLoadingText,
      chkboxFavorite } = this.state;
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
          {musicCardList.map((track, index) => (
            <div key={ track.trackId }>
              <MusicCard
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
                trackInfo={ track }
                showLoadingScreen={ this.showLoadingScreen }
                handleFavoriteMusic={ this.handleFavoriteMusic }
                chkboxFavorite={ chkboxFavorite[index] }
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
