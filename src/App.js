import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Requisito 1, eu criei os componentes pedidos com os atributos pedidos, importei todos aqui para o app e criei as rotas dentro de um switch, Isso depois de ter colocado no index o BrowserRouter em volta do app */}
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
