import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    load: false,
    name: '',
    email: '',
    image: '',
    description: '',
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
      description: result.description,
    });
  }

  render() {
    const { load, name, email, image, description } = this.state;
    if (load) {
      return <p>Carregando...</p>;
    }
    return (
      <div data-testid="page-profile">
        <p>{name}</p>
        <p>{email}</p>
        <img data-testid="profile-image" src={ image } alt="usuario" />
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
