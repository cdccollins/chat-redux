import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage } from '../actions'
import { initialState } from '../index'

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      author: initialState.currentUser,
      channel: initialState.selectedChannel
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createMessage(`${this.props.selectedChannel}`, `${this.state.author}`, `${this.state.value}`);
    this.state.value = ''
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" />
        <input type="submit" value="Submit" className="btn btn-danger form-control" />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  { createMessage: createMessage },
  dispatch
  );
}

function mapStateToProps(state) {
  return {
    message: state.message,
    selectedChannel: state.selectedChannel
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
