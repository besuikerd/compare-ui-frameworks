import { Component } from 'react';
import { connect } from 'react-redux';

import store from '../actions/store';

import Chat from '../components/Chat';

function mapStateToProps({store : {messages, channels}}){
  return {
    loading: !messages || !channels
  }
}

function mapDispatchToProps(dispatch){
  return {
    logout: () => dispatch(store.logout())
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ChatContainer extends Component {
  render(){
    return <Chat {...this.props}/>
  }
}