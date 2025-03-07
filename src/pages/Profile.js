import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Header from '../Components/Header';

class Profile extends React.Component {
  state = {
    load: false,
    name: '',
    email: '',
    image: '',
  };

  async componentDidMount() {
    this.setState({
      load: true,
    });
    const result = await getUser();
    this.setState({
      load: false,
      name: result.name,
      email: result.email,
      image: result.image,
    });
  }

  render() {
    const { load, name, email, image } = this.state;
    if (load) {
      return <div className="spinner-pages" />;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-info">
          <img
            className="profile-img"
            data-testid="profile-image"
            src={ image }
            alt="usuario"
          />
          <p className="name">NOME:</p>
          <p>{name}</p>
          <p className="email">E-MAIL:</p>
          <p>{email}</p>
          <Link className="profile-edit" to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
