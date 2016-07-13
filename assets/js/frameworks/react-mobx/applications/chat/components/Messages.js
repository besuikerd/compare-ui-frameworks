import { Component } from 'react';
import { observer } from 'mobx-react';

import Message from './Message';

@observer
export default class Messages extends Component{
  componentDidUpdate(){
    const { panel } = this.refs;
    panel.scrollTop = panel.scrollHeight;
  }

  render(){
    const {
      messages,
      channel
    } = this.props;

    const messageElements = messages.map(message => <li key={message._id}><Message {...{message}}/></li>)

    return <div ref="panel" className="chat-messages">
      <h2>#{channel.name}</h2>
      <ul className="pure-menu-list">
        { messageElements }
      </ul>
    </div>
  }
}