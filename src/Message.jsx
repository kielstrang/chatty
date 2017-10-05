import React, { Component } from 'react';
import PropTypes from 'proptypes';

class Message extends Component {
  static propTypes = {
    username: PropTypes.string,
    content: PropTypes.string,
    color: PropTypes.string
  }

  parseURLs(content) {
    //replace image URLs with the image
    const isImageURL = /^http[s]?:\/\/[^ "]+.(png|jpg|gif)/;
    if(isImageURL.test(content)) {
      return <img className="message-image" src={content} />;
    }

    //convert URLs within a message to links
    const isURL = /\b(http[s]?:\/\/[^ "]+)/;
    const images = [];
    return <div>
      {
        content.split(isURL).map((str, index) => {
          if(str.match(isURL)) {
            if(isImageURL.test(str)) {
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
        <span className="message-content">{this.parseURLs(this.props.content)}</span>
      </div>
    );
  }
}
export default Message;
