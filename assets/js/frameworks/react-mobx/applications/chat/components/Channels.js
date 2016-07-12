import { Component } from 'react';
import { observer } from 'mobx-react';

import Channel from './Channel';

@observer
export default class Channels extends Component {

  render(){
    const {
      channels,
      join
    } = this.props;

    const channelElements = channels.map(channel => <li key={channel._id}><Channel {...{join, channel}}/></li>);

    console.log(channelElements);
    return <div>
      <h2>Channels</h2>
      <ul className="pure-menu-list">
        { channelElements }
      </ul>

    </div>
  }
}