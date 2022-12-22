import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  // Setando os estados, nameartist pro input, apiObject é aonde salvo o retorno da api, is loading para a lógica de loading e albumnotfound para fazer a lógica de album não econtrado.
  state = {
    nameArtist: '',
    apiObject: [],
    isLoading: false,
    albumNotFound: false,
  };

  buttonSearchAlbum = async () => {
    // Nessa função que aciona ao clicar no botão, eu coloco o estado pra loading antes de chamar a api e chamo a api com o nome de data, faço um if para caso o data seja maior que zero ou seja, tenha rotorno da api ele acaba o loading, salva o data no estado e coloca abumnotfound pra false. Caso o data esteja zerado é pq nao achou album, entao eu aciono o album not found e termino o loading. Caso
    this.setState({
      isLoading: true,
      albumNotFound: false,
    });
    const { nameArtist } = this.state;
    const data = await searchAlbumsAPI(nameArtist);
    if (data.length > 0) {
      this.setState({
        isLoading: false,
        apiObject: data,
        albumNotFound: false,
      });
    } else {
      this.setState({
        albumNotFound: true,
        isLoading: false,
      });
    }
  };

  render() {
    const dois = 2;
    const { nameArtist, isLoading, apiObject, albumNotFound } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/* Aqui é a lógica do random, se tiver no loading some tudo, senão aparece tudo */}
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                // Aqui eu coloco no onChange para setar o estado nameArtist sempre com o valor do input
                onChange={ ({ target }) => this.setState({ nameArtist: target.value }) }
                // Aqui é a logica pra dar enter e o botao funcionar
                onKeyDown={ (e) => e.key === 'Enter' && this.buttonSearchAlbum() }
              />

              <button
                type="button"
                onClick={ this.buttonSearchAlbum }
                // Aqui é a lógica para liberar o botao
                disabled={ nameArtist.length < dois }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
              <h2>
                Resultado de álbuns de:
                {' '}
                {nameArtist}
              </h2>
            </form>
            {/* lógica do not found, se não achar o album ele só joga esse h1 */}
            {albumNotFound && <h1>Nenhum álbum foi encontrado</h1>}
            {/* aqui eu faco o map, uso o index para a key  que fica dentro de uma div emmbora nao seja muito recomendado, aí pego uma tag de img com o src da url da img da api, e faço um link com o data test que o readme pede e coloco pra linkar para a page album com o parametro da collection que veio . e o texto do link é tbm o nome da collection */}
            {apiObject.map((e, index) => (
              <div key={ index }>
                <img src={ e.artworkUrl100 } alt="Fotinha" />
                <br />
                <Link
                  data-testid={ `link-to-album-${e.collectionId}` }
                  to={ `/album/${e.collectionId}` }
                >
                  {e.collectionName}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
