import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: '' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    };
  }

  addMessage = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  changeUser = (name) => {
    this.setState({ currentUser: { name } });
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      const received = JSON.parse(event.data);
      switch(received.type) {
        case 'incomingMessage':
        case 'incomingNotification': {
          this.setState({ messages: this.state.messages.concat(received) });
          break;
        }
        case 'connectionUpdate': {
          this.setState({ userCount: received.userCount });
          break;
        }
        default: {
          console.error('Unknown message type:', received.type);
        }
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
