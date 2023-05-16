import React from 'react';
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
        {console.log(users)}
        {login ? <p>Carregando...</p> : <p data-testid="header-user-name">{users}</p>}
      </header>
    );
  }
}

export default Header;
