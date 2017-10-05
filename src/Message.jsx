import React, { Component } from 'react';
import PropTypes from 'proptypes';

class Message extends Component {
  static propTypes = {
    username: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.string
  }

  isImageURL(content) {
    const urlRegex = /^http[s]?:\/\/[^ "]+.(png|jpg|gif)/;
    return urlRegex.test(content);
  }

  render() {
    const style = { color: this.props.color || 'black' };
    console.log('Image?', this.isImageURL(this.props.content));
    return (
      <div className="message">
        <span className="message-username" style={style}>{this.props.username}</span>
        {this.isImageURL(this.props.content) ?
          <span className="message-content"><img className="message-image" src={this.props.content} /></span> :
          <span className="message-content">{this.props.content}</span>}
      </div>
    );
  }
}
export default Message;
