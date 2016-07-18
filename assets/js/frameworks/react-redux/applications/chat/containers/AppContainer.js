import { Component } from 'react';
import { connect } from 'react-redux';

import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';

function mapStateToProps({store: {user}}){
  return {user};
}

@connect(mapStateToProps)
export default class AppContainer extends Component {

  render(){
    const {
      user
    } = this.props;
    return user === null ? <LoginContainer/> : <ChatContainer/>
  }
}
