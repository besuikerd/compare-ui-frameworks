import { Component } from 'react';
import { connect } from 'react-redux';

import Messages from '../components/Messages';
import ChatInput from '../components/ChatInput';

import store from '../actions/store';

function mapStateToProps({store: {textInput, channel, messages}}){
  return {
    textInput,
    channel,
    messages
  };
}

function mapDispatchToProps(dispatch){
  return {
    setTextInput(textInput) {
      dispatch(store.setTextInput(textInput));
    },
    sendMessage(){
      dispatch(store.sendMessage());
    }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class MessagesContainer extends Component{
  render(){
    const {
      textInput,
      setTextInput,
      sendMessage,
      channel,
      messages
    } = this.props;

    return <div className="chat-message-panel">
      {
        channel ? <Messages {...{channel, messages}}/> : null
      }
      <ChatInput {...{textInput, setTextInput, sendMessage}}/>
    </div>;
  }
}