import React, { Component } from 'react';
import PropTypes from 'proptypes';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.onContent = this.onContent.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  static propTypes = {
    currentUser: PropTypes.object,
    addMessage: PropTypes.func
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onKeyPress(event) {
    if(event.key === 'Enter') {
      const message = {content: this.state.content, username: this.props.currentUser.name};
      this.props.addMessage(message);
      event.target.value = '';
      this.setState({
        content: ''
      });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onContent} onKeyPress={this.onKeyPress}/>
      </footer>
    );
  }
}
export default ChatBar;