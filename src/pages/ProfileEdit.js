import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    load: false,
    name: '',
    email: '',
    description: '',
    image: '',
    button: false,
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

  hanlderChange = (event) => {
    const { type, value, checked } = event.target;
    const { name, description, email, image } = this.state;
    const emailValid = this.validateEmail(email);
    if (name.length > 0 && description.length > 0
      && email.length > 0 && image.length > 0 && emailValid) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
    const values = type === 'checkbox' ? checked : value;
    this.setState({
      [event.target.name]: values,
    });
  };

  UserName = async () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    this.setState({
      load: true,
    });
    await updateUser({ name,
      email,
      image,
      description });
    history.push('/profile');
  };

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  render() {
    const { load, name, email, description, image, button } = this.state;
    if (load) {
      return <p>Carregando...</p>;
    }
    return (
      <div data-testid="page-profile-edit">
        <form>
          <label>
            Nome:
            <br />
            <input
              data-testid="edit-input-name"
              value={ name }
              name="name"
              onChange={ this.hanlderChange }
            />
          </label>
          {' '}
          <br />
          <label>
            Email:
            <br />
            <input
              data-testid="edit-input-email"
              value={ email }
              name="email"
              onChange={ this.hanlderChange }
            />
          </label>
          {' '}
          <br />
          <label>
            Descrição:
            <br />
            <textarea
              data-testid="edit-input-description"
              value={ description }
              name="description"
              onChange={ this.hanlderChange }
            />
          </label>
          {' '}
          <br />
          <input
            data-testid="edit-input-image"
            type="text"
            onChange={ this.hanlderChange }
            name="image"
            value={ image }
          />
          <img src={ image } alt="Profile" />
          {' '}
          <br />
          <button
            data-testid="edit-button-save"
            onClick={ this.UserName }
            disabled={ button }
          >
            Salvar
          </button>

        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
