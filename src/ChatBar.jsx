import React, { Component } from 'react';
import PropTypes from 'proptypes';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static propTypes = {
    currentUser: PropTypes.object,
    addMessage: PropTypes.func
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    if(event.key === 'Enter') {
      const message = { content: event.target.value, username: this.props.currentUser.name };
      this.props.addMessage(message);
      this.setState({ content: '' });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit} />
      </footer>
    );
  }
}
export default ChatBar;