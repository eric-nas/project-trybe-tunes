import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../Components/Header';

class ProfileEdit extends React.Component {
  state = {
    load: false,
    name: '',
    email: '',
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
    const { name, email } = this.state;
    const emailValid = this.validateEmail(email);
    if (name.length > 0 && email.length > 0 && emailValid) {
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

  handlerFileInput = (event) => {
    const arquivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const images = e.target.result;
      this.setState({
        image: images,
      });
    };
    reader.readAsDataURL(arquivo);
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
    const { load, name, email, image, button } = this.state;
    if (load) {
      return <div className="spinner-pages" />;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form className="profile-edit-form">
          <label className="profile-edit-image">
            <input type="file" accept="image/*" onChange={ this.handlerFileInput } />
            <img src={ image } alt="" className="perfilimg" />
          </label>
          <label>
            <p className="name">NOME:</p>
            <input
              type="text"
              data-testid="edit-input-name"
              value={ name }
              name="name"
              onChange={ this.hanlderChange }
            />
          </label>
          <br />
          <label>
            <p className="email">E-MAIL:</p>
            <input
              type="text"
              data-testid="edit-input-email"
              value={ email }
              name="email"
              onChange={ this.hanlderChange }
            />
          </label>
          {' '}
          <br />
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
