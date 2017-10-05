import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: '', color: 'orange' }, // optional. if currentUser is not defined, it means the user is Anonymous
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

  changeColor = (color) => {
    console.log('color');
    this.setState({ currentUser: { color } });
  }

  display = (message, displayType) => {
    message.displayType = displayType;
    this.setState({ messages: this.state.messages.concat(message) });
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      const received = JSON.parse(event.data);
      switch(received.type) {
        case 'incomingMessage': {
          this.display(received, 'message');
          break;
        }
        case 'incomingNotification': {
          this.display(received, 'notification');
          break;
        }
        case 'connectionUpdate': {
          this.setState({ userCount: received.userCount });
          if(received.content) {
            this.display(received, 'notification');
          }
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
        <NavBar userCount={this.state.userCount} color={this.state.currentUser.color}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeUser={this.changeUser}
          changeColor={this.changeColor}  />
      </div>
    );
  }
}
export default App;
