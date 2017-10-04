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
      if(message.displayType === 'message') return <Message username={message.username} content={message.content} key={message.id} />;
      if(message.displayType === 'notification') return <Notification content={message.content} key={message.id} />;
      throw new Error(`Could not display type ${message.displayType}`);
    });
    return (
      <main className="messages">
        {messageItems}
      </main>
    );
  }
}
export default MessageList;

