import { Component } from 'react';
import classnames from 'classnames';

export default ({channel, active, joinChannel}) => {
  return <span className={classnames({'chat-channel': true, 'chat-channel-active': active})} onClick={() => joinChannel(channel)}>
    #{channel.name}
  </span>;
}