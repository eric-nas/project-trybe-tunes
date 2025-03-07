import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import foneImage from '../images/fone.png';
import lupa from '../images/lupa.png';
import favorite from '../images/Favoritos.png';
import profile from '../images/profile.png';

class Header extends React.Component {
  state = {
    login: true,
    users: '',
    userImage: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      login: false,
      users: user.name,
      userImage: user.image,
    });
  }

  render() {
    const { login, users, userImage } = this.state;
    return (
      <header data-testid="header-component" className="Header">
        <img className="fone-icon" src={ foneImage } alt="foneImage" />
        <div className="header-search-button">
          <img className="lupa" src={ lupa } alt="lupa" />
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
        </div>
        <div className="header-favorite-button">
          <img className="star" src={ favorite } alt="star" />
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        </div>
        <div className="header-profile-button">
          <img className="profile" src={ profile } alt="profile" />
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
        <div>
          {login
            ? <div className="spinner-header" />
            : (
              <div className="user-container">
                <img src={ userImage } className="user-img" alt="userimage" />
                <p data-testid="header-user-name">{users}</p>
              </div>
            )}
        </div>
      </header>
    );
  }
}

export default Header;
