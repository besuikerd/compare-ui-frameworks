import { Component } from 'react';
import { observer } from 'mobx-react';

export default class Message extends Component{
  render(){
    const {
      message
    } = this.props;

    console.log(message.user);
    
    return <span>
      <b>{message.user.name}</b>:
      <p>{message.message}</p>
    </span>
  }
}