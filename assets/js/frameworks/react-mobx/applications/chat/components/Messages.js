import { Component } from 'react';
import { observer } from 'mobx-react';

import Message from './Message';

@observer
export default class Messages extends Component{
  render(){
    const {
      messages
    } = this.props;

    const messageElements = messages.map(message => <li key={message._id}><Message {...{message}}/></li>)

    return <div>
      <h2>Messages</h2>
      <ul>
        { messageElements }
      </ul>
    </div>
  }
}