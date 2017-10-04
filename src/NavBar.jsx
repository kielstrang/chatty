import React, { Component } from 'react';
import PropTypes from 'proptypes';

class NavBar extends Component {
  static propTypes = {
    userCount: PropTypes.number
  }
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users">{this.props.userCount} user{this.props.userCount === 1 ? '' : 's'} online</span>
      </nav>
    );
  }
}
export default NavBar;