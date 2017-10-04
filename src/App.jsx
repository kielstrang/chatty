import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextID: 4,
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          type: 'message'
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          type: 'message'
        }
      ]
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
      received.id = this.state.nextID;
      const messages = this.state.messages.concat(received);
      this.setState({ messages: messages, nextID: this.state.nextID + 1 });
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
