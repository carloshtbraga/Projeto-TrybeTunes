import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  // Declarei o estado para usar o name e fazer a lógica do loading
  state = {
    name: '',
    isLoading: false,
  };

  componentDidMount() {
    // Aqui eu chamo a funcao que cirei no didmount para usar ela assim que for montado
    this.gettingUser();
  }

  gettingUser = async () => {
    // Essa funcao coloca o loading no state como true e depois pega o retorno da funcao que vem ja vem pronta, get user, para pegar o nome que está salvo lá e colocar no estado
    this.setState({
      isLoading: true,
    });
    const retorno = await getUser();
    this.setState({
      name: retorno.name,
      isLoading: false,
    });
  };

  render() {
    const { name, isLoading } = this.state;

    return (
      <div data-testid="header-component">
        {/* Aqui eu faco um ternario de apenas um retorno, por isso uso o &&. Caso o estado isLoading esteja como true, ele vai renderizar o componente Loading */}
        {isLoading && <Loading />}
        <nav>
          <Link data-testid="link-to-search" to="/search">
            Search
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favorites
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </nav>
        <p data-testid="header-user-name">{ name }</p>
      </div>
    );
  }
}

export default Header;
