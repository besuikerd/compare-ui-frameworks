import Channel from './Channel';

export default ({
  channels,
  activeChannel,
  joinChannel
}) => {
  console.log('channels', channels, activeChannel)
  const channelElements = channels.map(channel => <li key={channel._id}><Channel active={activeChannel !== null ? activeChannel._id === channel._id : false} {...{joinChannel, channel}}/></li>);

  return <div className="chat-channels">
    <h2 className="chat-panel-header">Channels</h2>
    <ul className="pure-menu-list chat-channel-list">
      { channelElements }
    </ul>
  </div>
}