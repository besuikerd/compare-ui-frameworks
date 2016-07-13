import { Component } from 'react';
import { observer } from 'mobx-react';

import Channel from './Channel';

@observer
export default class Channels extends Component {

  render(){
    const {
      channels,
      channel: activeChannel,
      join
    } = this.props;

    const channelElements = channels.map(channel => <li key={channel._id}><Channel active={activeChannel && activeChannel._id === channel._id} {...{join, channel}}/></li>);

    return <div className="chat-channels">
      <h2 className="chat-panel-header">Channels</h2>
      <ul className="pure-menu-list chat-channel-list">
        { channelElements }
      </ul>
    </div>
  }
}