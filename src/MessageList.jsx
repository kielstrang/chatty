import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
import PropTypes from 'proptypes';

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
  }
  render() {
    const messageItems = this.props.messages.map(message => {
      if(message.type === 'incomingMessage') return <Message username={message.username} content={message.content} key={message.id} />;
      if(message.type === 'incomingNotification') return <Notification content={message.content} key={message.id} />;
      throw new Error(`Unknown message type: ${message.type}`);
    });
    return (
      <main className="messages">
        {messageItems}
      </main>
    );
  }
}
export default MessageList;

