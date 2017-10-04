import React, { Component } from 'react';
import PropTypes from 'proptypes';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', username: this.props.currentUser.name };
  }
  static propTypes = {
    currentUser: PropTypes.object,
    addMessage: PropTypes.func,
    changeUser: PropTypes.func
  }

  getNameChangeMessage = () => {
    const oldName = this.props.currentUser.name || 'Anonymous';
    const change = this.state.username ? `changed their name to ${this.state.username}` : 'became anonymous';
    return { content: `${oldName} ${change}`, type: 'postNotification' };
  }

  handleUserChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleUserEnter = (event) => {
    if(event.key === 'Enter') {
      this.props.addMessage(this.getNameChangeMessage());
      this.props.changeUser(this.state.username);
    }
  }

  handleMessageChange = (event) => {
    this.setState({ content: event.target.value });
  }

  handleMessageEnter = (event) => {
    if(event.key === 'Enter') {
      const message = { content: event.target.value, username: this.props.currentUser.name || 'Anonymous', type: 'postMessage' };
      this.props.addMessage(message);
      this.setState({ content: '' });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUserChange}
          onKeyPress={this.handleUserEnter} />
        <input className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleMessageChange}
          onKeyPress={this.handleMessageEnter} />
      </footer>
    );
  }
}
export default ChatBar;