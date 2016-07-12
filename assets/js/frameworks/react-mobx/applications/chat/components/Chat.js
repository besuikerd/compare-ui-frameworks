import { Component } from 'react';
import { observer } from 'mobx-react';

import Loading from './Loading';
import Channels from './Channels';
import Messages from './Messages';

@observer
export default class Chat extends Component{
  render(){
    const {
      store
    } = this.props;

    const {
      messages,
      channels,
      user,
    } = store;

    const loading = !messages || !channels;

    return <div className="chat-chat">
      <Loading visible={loading}/>
      <h1>Epic chat with {store.user.name}!</h1>
      <button className="pure-button pure-button-secondary" onClick={store.logout}>Logout</button>


      <Channels join={store.joinChannel} channels={channels || []} />
      <Messages messages={messages || []}/>
    </div>;
  }
}