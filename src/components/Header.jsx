import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        {showLoadingScreen
          ? <Loading /> : <span data-testid="header-user-name">{ `${name}` }</span>}
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
