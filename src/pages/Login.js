import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    inputButton: true,
    input: '',
    loggin: false,
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

  handlerInput = (event) => {
    const { type, checked, value, name } = event.target;
    const values = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: values,
    });
  };

  UserName = async () => {
    const { input } = this.state;
    const { history } = this.props;
    this.setState({
      loggin: true,
    });
    await createUser({ name: input });
    history.push('/search');
  };

  render() {
    const { inputButton, loggin, input } = this.state;
    if (loggin) {
      return <p>Carregando...</p>;
    }
    return (

      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            id="name"
            name="input"
            value={ input }
            onChange={ this.handlerInput }
          />
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
