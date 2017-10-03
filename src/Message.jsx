import React, { Component } from 'react';
import PropTypes from 'proptypes';

class Message extends Component {
  static propTypes = {
    username: PropTypes.string,
    content: PropTypes.string
  }
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
