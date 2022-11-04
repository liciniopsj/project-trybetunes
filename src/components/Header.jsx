import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userCredentials: {},
      showLoadingScreen: false,
    };

    this.showLoadingScreen = this.showLoadingScreen.bind(this);
  }

  async componentDidMount() {
    this.showLoadingScreen();
    const response = await getUser();
    // console.log(response);
    this.setState({
      userCredentials: response,
    });
  }

  showLoadingScreen = () => {
    const LOADTIME = 1500;
    this.setState({ showLoadingScreen: true });
    setTimeout(() => {
      this.setState({ showLoadingScreen: false });
    }, LOADTIME);
  };

  render() {
    const { showLoadingScreen, userCredentials: { name } } = this.state;
    return (
      <header data-testid="header-component">
        Header
        {showLoadingScreen
          ? <Loading /> : <p data-testid="header-user-name">{ `${name}` }</p>}
      </header>
    );
  }
}

export default Header;
