import React, { Component } from 'react';
import PropTypes from 'proptypes';

class Notification extends Component {
  static propTypes = {
    username: PropTypes.string,
    content: PropTypes.string
  }
  render() {
    return (
      <div className="message system">{this.props.content}</div>
    );
  }
}
export default Notification;
