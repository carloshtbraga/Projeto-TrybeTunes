import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  // Aqui eu crio os estados do loading, botão e name, o name para guardar o valor do input os outros dois para trabalhar a lógica
  state = {
    isButtonDisabled: true,
    isLoading: false,
    name: '',
  };

  buttonValidation = () => {
    // Essa função faz a validacao do botao, eu pego o nameInput do estado e faço uma variavel que retorna booleano, essa variavel confere se o .length do nameInput é maior ou igual a 3. Caso de certo retorna true, aí eu inverto isso com o ! para que o estado do isButtonDisabled fique falso e o botao libere
    const { name } = this.state;
    const three = 3;
    const higherThanThree = name.length >= three;
    this.setState({
      isButtonDisabled: !higherThanThree,
    });
  };

  handleChange = ({ target }) => {
    // Essa e a funca basica que input de texto ela pega o valor do que está sendo digitado no input e coloca no estado a cada mudança que ocorre e ao mesmo tempo a cada mudança ela roda a função de validacao do botao
    const { value } = target;
    this.setState(
      {
        name: value,
      },
      this.buttonValidation,
    );
  };

  handleClick = () => {
    // aqui eu pego o hsitory que vem automatico como props la do Route pois nele ficam salvas as rotas que eu passei e tbm o nameInput do state depois, coloco o estado para ficar como loading, no segundo parametro do setstate eu uso a callback para que o que vem depois só aconteça após o primeiro parametro ocorrer que no caso é o de mudar o estado do loading. Entao caso o nameInput exista(ele foi colcoado no input text) a gente roda a funcao que ja vem pronta pra criar um usuario com esse nome. Depois ela leva a gente para a pagina search.
    const { history } = this.props;
    const { push } = history;
    const { name } = this.state;
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        if (name) {
          await createUser({ name });
          return push('/search');
        }
      },
    );
  };

  render() {
    const { name, isButtonDisabled, isLoading } = this.state;
    return (
      <form>
        {/* Aqui eu faco um ternario de apenas um retorno, por isso uso o &&. Caso o estado isLoading esteja como true, ele vai renderizar o componente Loading */}
        {isLoading && <Loading /> }
        <div data-testid="page-login">
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleChange }
              onKeyDown={ (e) => e.key === 'Enter' && this.handleClick() }
            />
          </label>
          <button
            disabled={ isButtonDisabled }
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
