import React, { Component } from 'react';
import PropTypes from 'proptypes';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onEnterMessage = this.onEnterMessage.bind(this);
  }
  static propTypes = {
    currentUser: PropTypes.object,
    addMessage: PropTypes.func
  }

  onEnterMessage(event) {
    if(event.key === 'Enter') {
      const message = {content: event.target.value, username: this.props.currentUser.name};
      this.props.addMessage(message);
      event.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onEnterMessage}/>
      </footer>
    );
  }
}
export default ChatBar;