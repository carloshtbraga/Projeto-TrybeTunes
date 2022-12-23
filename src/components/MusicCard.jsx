import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    checkboxChecked: false,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      checkboxChecked: await this.getFromFavorites(),
    });
  }

  handleChangeCheckbox = async ({ target: { checked } }) => {
    const { song } = this.props;
    this.setState({
      isLoading: true,
    });
    if (checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }
    this.setState({
      checkboxChecked: checked,
      isLoading: false,
    });
  };

  getFromFavorites = async () => {
    const { song: { trackName } } = this.props;
    const datafav = await getFavoriteSongs();
    return datafav.map((fav) => fav.trackName).includes(trackName);
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
