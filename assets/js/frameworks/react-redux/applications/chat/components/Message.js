import { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

@observer
export default class Message extends Component{
  render(){
    const {
      message
    } = this.props;

    return <span>
      <b className="chat-message-name">{message.user.name}</b>
      <span className="chat-message-time">
        {moment(message.created_at).format('MM/DD HH:mm')}
      </span>
      <p className="chat-message-message">{message.message}</p>
    </span>
  }
}