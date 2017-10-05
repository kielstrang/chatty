import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { GithubPicker } from 'react-color';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', username: this.props.username, color: this.props.color };
  }
  static propTypes = {
    currentUser: PropTypes.object,
    addMessage: PropTypes.func,
    changeUser: PropTypes.func,
    changeColor: PropTypes.func
  }

  getNameChangeMessage = () => {
    const oldName = this.props.username || 'Anonymous';
    const change = this.state.username ? `changed their name to ${this.state.username}` : 'became anonymous';
    return { content: `${oldName} ${change}`, type: 'postNotification', nameUpdate: this.state.username || 'Anonymous' };
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
      const message = { content: event.target.value, username: this.props.username || 'Anonymous', type: 'postMessage', color: this.props.color };
      this.props.addMessage(message);
      this.setState({ content: '' });
    }
  }

  render() {
    return (
      <footer className="chatbar" style={{ background: this.props.color }}>
        <GithubPicker color={this.state.color} onChange={this.props.changeColor} triangle='hide'/>
        <input className="chatbar-username"
          placeholder="Enter your name"
          value={this.state.username}
          onChange={this.handleUserChange}
          onKeyPress={this.handleUserEnter}
        />
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