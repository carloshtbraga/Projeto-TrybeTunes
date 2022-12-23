import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    checkboxChecked: false,
    isLoading: false,
  };

  handleChangeCheckbox = async ({ target: { checked } }) => {
    const { song } = this.props;
    this.setState({
      isLoading: true,
    });
    if (checked) {
      await addSong(song);
      this.setState({
        checkboxChecked: true,
        isLoading: false,
      });
    }
  };

  render() {
    const { checkboxChecked, isLoading } = this.state;
    const { song: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div>
        {isLoading && <Loading />}
        <h3>{trackName}</h3>
        <label htmlFor="checkbox">
          Favorita
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkboxChecked }
            onChange={ this.handleChangeCheckbox }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
