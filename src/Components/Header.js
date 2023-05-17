import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    login: true,
    users: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      login: false,
      users: user.name,
    });
  }

  render() {
    const { login, users } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        {login ? <p>Carregando...</p> : <p data-testid="header-user-name">{users}</p>}
      </header>
    );
  }
}

export default Header;
