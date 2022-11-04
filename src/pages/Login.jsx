import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    inputName: '',
    buttonStatus: true,
    showLoadingScreen: false,
  };

  handleInput = (event) => {
    const { value } = event.target;
    // const { history } = this.props;
    // console.log(value);
    // console.log(history);

    this.setState({
      inputName: value,
    }, this.handleButtonDisableToggle);
  };

  handleButtonDisableToggle = () => {
    const { inputName } = this.state;
    const INPUT_MIN_SIZE = 3;
    const inputLenghtValidation = inputName.length >= INPUT_MIN_SIZE;
    // console.log(inputLenghtValidation);
    this.setState({
      buttonStatus: !inputLenghtValidation,
    });
  };

  showLoadingScreen = () => {
    const LOADTIME = 1500;
    this.setState({ showLoadingScreen: true });
    setTimeout(() => {
      this.setState({ showLoadingScreen: false });
    }, LOADTIME);
  };

  handleLoginButton = async (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    const { history } = this.props;
    this.showLoadingScreen();
    await createUser({ name: inputName });
    history.push('/search');
  };

  render() {
    const { inputName, buttonStatus, showLoadingScreen } = this.state;
    const loginHTML = (
      <div data-testid="page-login">
        <form action="" method="get">
          <label htmlFor="inputName">
            Login:
            <input
              data-testid="login-name-input"
              type="text"
              name="inputName"
              id="inputName"
              value={ inputName }
              onChange={ this.handleInput }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ buttonStatus }
            onClick={ this.handleLoginButton }
          >
            Entrar
          </button>
        </form>
      </div>);
    return (
      showLoadingScreen ? <Loading /> : loginHTML
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goFoward: PropTypes.func,
    lenght: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.shape({
        path: PropTypes.string,
        state: PropTypes.string,
      }),
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};
