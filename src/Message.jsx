import React, { Component } from 'react';
import PropTypes from 'proptypes';

class Message extends Component {
  static propTypes = {
    username: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.string
  }

  replaceURLs(content) {
    const url = /\b(http[s]?:\/\/[^ "]+)/;
    const imgURL = /\bhttp[s]?:\/\/[^ "]+.(png|jpg|gif)/;
    const splitURLs = content.split(url);
    const images = [];
    return <div>
      {
        splitURLs.map((str, index) => {
          if(str.match(url)) {
            if(str.match(imgURL)) {
              images.push(str);
            }
            return <a href={str} key={index}>{str}</a>;
          }
          return str;
        })
      }
      {
        images.map((image, index) => {
          return <img className="message-image" src={image} key={index} />;
        })
      }
    </div>;
  }

  render() {
    const style = { color: this.props.color || 'black' };
    return (
      <div className="message">
        <span className="message-username" style={style}>{this.props.username}</span>
        <span className="message-content">{this.replaceURLs(this.props.content)}</span>
      </div>
    );
  }
}
export default Message;
