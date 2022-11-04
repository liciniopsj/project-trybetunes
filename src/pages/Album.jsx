import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    getMusicsResults: [],
    artistInfo: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const getMusicsResults = await getMusics(id);
    const artistInfo = getMusicsResults[0];
    // getMusicsResults.shift();
    // console.log(getMusicsResults);
    // console.log(artistInfo);
    this.setState({
      getMusicsResults,
      artistInfo,
    });
  }

  render() {
    const { match } = this.props;
    const { id } = match.params;
    const { getMusicsResults, artistInfo } = this.state;
    const { artistName, collectionName } = artistInfo;
    const musicCardList = getMusicsResults.slice(1);
    return (
      <div data-testid="page-album">
        <Header />
        <p>{ `Album ${id}` }</p>
        <div>
          <img src={ artistInfo.artworkUrl100 } alt="Album Cover" />
          <h3 data-testid="artist-name">{artistName}</h3>
          <h4 data-testid="album-name">{collectionName}</h4>
        </div>
        {musicCardList.map((track) => (
          <div key={ track.trackId }>
            <MusicCard trackName={ track.trackName } previewUrl={ track.previewUrl } />
          </div>
        ))}
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
