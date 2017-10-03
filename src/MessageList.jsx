import React, { Component } from 'react';
import Message from './Message.jsx';
import PropTypes from 'proptypes';

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
  }
  render() {
    const messageItems = this.props.messages.map(message => <Message username={message.username} content={message.content} />);
    return (
      <main className="messages">
        {messageItems}
      </main>
    );
  }
}
export default MessageList;

