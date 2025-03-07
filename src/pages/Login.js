import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import perfilImage from '../images/perfil.png';

class Login extends React.Component {
  state = {
    inputButton: true,
    input: '',
    loggin: false,
    email: '',
    image: perfilImage,
    description: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { input, email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = emailRegex.test(email);
    const value = 3;
    if (prevState.input !== input || prevState.email !== email) {
      if (input.length > 2 && validateEmail) {
        this.setState({ inputButton: false });
      } else if (input.length < value && !validateEmail) {
        this.setState({ inputButton: true });
      }
    }
  }

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

  handlerInput = (event) => {
    console.log(this.state);
    const { type, checked, value, name } = event.target;
    const values = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: values,
    });
  };

  UserName = async () => {
    const { input, email, image, description } = this.state;
    const { history } = this.props;
    this.setState({
      loggin: true,
    });
    await createUser({ name: input,
      email,
      image,
      description });
    history.push('/search');
  };

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  render() {
    const { inputButton, loggin, input, email, image } = this.state;
    if (loggin) {
      return <div className="spinner-pages" />;
    }
    return (

      <div data-testid="page-login" className="page-login">
        <form>
          <label className="image">
            <input type="file" accept="image/*" onChange={ this.handlerFileInput } />
            <img src={ image } alt="" className="perfilimg" />
          </label>
          <br />
          <label>
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              name="input"
              placeholder="Digite seu Nome"
              value={ input }
              onChange={ this.handlerInput }
            />
          </label>
          {' '}
          <br />
          <label>
            {' '}
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Digite seu Email"
              value={ email }
              onChange={ this.handlerInput }
            />
          </label>
          {' '}
          <br />
          {' '}
          <br />
          <button
            id="login-button"
            style={ { cursor: inputButton ? 'not-allowed' : 'pointer' } }
            onClick={ this.UserName }
            disabled={ inputButton }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
