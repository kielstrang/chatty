import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    const randomColor = App.userColors[Math.floor(Math.random() * App.userColors.length)];
    this.state = {
      currentUser: { name: '', color: randomColor },
      messages: [],
      userCount: 0
    };
  }

  static userColors = ['#C80000', '#FF8000', '#FCCB00', '#008B02', '#00ADFF', '#004DCF', '#8600EB', '#C000C0'];

  addMessage = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  changeUser = (name) => {
    const currentUser = this.state.currentUser;
    currentUser.name = name;
    this.setState({ currentUser });
  }

  changeColor = ({ hex }) => {
    const currentUser = this.state.currentUser;
    currentUser.color = hex;
    this.setState({ currentUser });
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
      case 'incomingMessage':
        this.display(received, 'message');
        break;
      case 'incomingNotification':
        this.display(received, 'notification');
        break;
      case 'connectionUpdate':
        this.setState({ userCount: received.userCount });
        if(received.content) {
          this.display(received, 'notification');
        }
        break;
      default:
        console.error('Unknown message type:', received.type);
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} color={this.state.currentUser.color} />
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name}
          color={this.state.currentUser.color}
          userColors={App.userColors}
          addMessage={this.addMessage}
          changeUser={this.changeUser}
          changeColor={this.changeColor} />
      </div>
    );
  }
}
export default App;
