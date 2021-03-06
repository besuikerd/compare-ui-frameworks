import { Component } from 'react';
import { observer } from 'mobx-react';

import Loading from './Loading';
import Channels from './Channels';
import Messages from './Messages';
import Users from './Users';
import ChatInput from './ChatInput';

@observer
export default class Chat extends Component{
  render(){
    const {
      store
    } = this.props;

    const {
      messages,
      channels,
      channel,
      users,
      user,
    } = store;

    const loading = !messages || !channels;

    return <div className="chat">
      <Loading visible={loading}/>
      <div className="chat-panel">
        <Channels join={store.joinChannel} channel={channel} channels={channels || []} />
        <Users users={users || []}/>
        <div className="chat-logout">
          <button className="pure-button pure-button-secondary" onClick={store.logout}>Logout</button>
        </div>
      </div>
      <div className="chat-message-panel">
        {
          channel ? <Messages channel={channel} messages={messages || []}/> : null
        }
        <ChatInput setTextInput={store.setTextInput} sendMessage={store.sendMessage} textInput={store.textInput}/>
      </div>
    </div>;
  }
}