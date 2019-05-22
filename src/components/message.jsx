import React, { Component } from 'react';

class Message extends Component {
  render() {
    const time = new Date(this.props.message.created_at).toLocaleTimeString()
    return(
      <div className="message">
        <p>{this.props.message.author} - {time}</p>
        <p>{this.props.message.content}</p>
      </div>
    )
  }
}

export default Message
