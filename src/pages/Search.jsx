import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    artistInput: '',
  };

  buttonArtistValidation = () => {
    const { artistInput } = this.state;
    const two = 2;
    const higherThanTwo = artistInput.length >= two;
    this.setState({
      isButtonDisabled: !higherThanTwo,
    });
  };

  handleArtistChange = ({ target }) => {
    const { value } = target;
    this.setState(
      {
        artistInput: value,
      },
      this.buttonArtistValidation,
    );
  };

  render() {
    const { isButtonDisabled, artistInput } = this.state;
    return (
      <div>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <form>
            <label htmlFor="artistInput">
              Digite o nome da banda
              <input
                type="text"
                name="artistInput"
                id="artistInput"
                data-testid="search-artist-input"
                value={ artistInput }
                onChange={ this.handleArtistChange }
              />
            </label>
            <button
              type="button"
              disabled={ isButtonDisabled }
              data-testid="search-artist-button"
            >
              Procurar Artista
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
