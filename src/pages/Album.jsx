import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
    apiReturnFromIndex1on: [],
  };

  componentDidMount() {
    this.searchMusicOnApi();
  }

  searchMusicOnApi = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
      apiReturnFromIndex1on: data.slice(1),
    });
  };

  render() {
    const { artistName, collectionName, apiReturnFromIndex1on } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h3 data-testid="album-name">{collectionName}</h3>
        { apiReturnFromIndex1on
          .map((song) => <MusicCard key={ song.trackId } song={ song } />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
