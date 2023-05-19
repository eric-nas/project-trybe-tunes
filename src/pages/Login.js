import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    inputButton: true,
    input: '',
    loggin: false,
    email: '',
    image: '',
    description: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { input } = this.state;
    const value = 3;
    if (prevState.input !== input && input.length > 2) {
      this.setState({
        inputButton: false,
      });
    } if (prevState.input !== input && input.length < value) {
      this.setState({
        inputButton: true,
      });
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

  render() {
    const { inputButton, loggin, input, email, description, image } = this.state;
    if (loggin) {
      return <p>Carregando...</p>;
    }
    return (

      <div data-testid="page-login">
        <form>
          <label>
            {' '}
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              id="name"
              name="input"
              value={ input }
              onChange={ this.handlerInput }
            />
          </label>
          {' '}
          <br />
          <label>
            {' '}
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handlerInput }
            />
          </label>
          {' '}
          <br />
          <label>
            {' '}
            Photo:
            <br />
            <input type="file" onChange={ this.handlerFileInput } />
            <img src={ image } alt="Profile" />
          </label>
          {' '}
          <br />
          <labe>
            {' '}
            Descrição:
            <br />
            <textarea
              id="description"
              name="description"
              value={ description }
              onChange={ this.handlerInput }
            />
          </labe>
          <br />
          <button
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
