import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends Component {
  render() {
    const { match } = this.props;
    const { id } = match.params;
    return (
      <div data-testid="page-album">
        <Header />
        { `Album ${id}` }
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
