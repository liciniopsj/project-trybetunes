import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      trackId, handleFavoriteMusic, chkboxFavorite } = this.props;
    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox-music">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackName }
            id={ trackId }
            checked={ chkboxFavorite }
            onChange={ handleFavoriteMusic }
            alt={ trackId }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackname: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
