import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions'
import Message from '../components/message';
import MessageForm from './message_form';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.listHeight = React.createRef();
  }

  componentWillMount() {
    this.fetchMessages()
  }

  render() {
    return (
      <div className="messageList" ref={this.listHeight}>
        <h2>Channel #{this.props.selectedChannel}</h2>
        <div className="message">
          {this.props.messages.map(message => <Message message={message} key={message.created_at}/> )}
        </div>
        <div className="messageForm">
          <MessageForm />
        </div>
      </div>

    )
  }

  fetchMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  componentDidMount() {
    var interval = setInterval(this.fetchMessages, 10000)
    this.setState({interval: interval});
  }

  componentWillUnmount() {
    this.listHeight.current.scrollTop = this.listHeight.current.scrollHeight
    clearInterval(this.state.interval)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  { fetchMessages: fetchMessages },
  dispatch
  );
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
