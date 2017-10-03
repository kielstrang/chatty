import React, { Component } from 'react';
import PropTypes from 'proptypes';

class ChatBar extends Component {
  static propTypes = {
    currentUser: PropTypes.object
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;