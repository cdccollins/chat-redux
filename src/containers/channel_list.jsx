import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectChannel } from '../actions'
import { fetchMessages } from '../actions'
import { initialState } from '../index';

class ChannelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: initialState.channels,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedChannel !== this.props.selectedChannel) {
      this.props.fetchMessages(nextProps.selectedChannel);
    }
  }

  handleClick = (channel) => {
    this.props.selectChannel(channel)
  }

  render() {
    var clazz = "channel"
    return (
      <div className="channelList">
        {this.state.channels.map(channel => {
          (channel === this.props.selectedChannel ? clazz += " selected" : clazz = "channel")
          return <div className={clazz} onClick={() => this.handleClick(channel)} key={channel}>#{channel}</div>
        })}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  { selectChannel, fetchMessages },
  dispatch
  );
}

function mapStateToProps(state) {
  return {
    selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
