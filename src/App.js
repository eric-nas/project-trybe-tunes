import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import PageNotFound from './pages/PageNotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/profile/Edit" component={ ProfileEdit } />
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route path="" component={ PageNotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
