import { Component } from 'react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';

export default class Channel extends Component{

  @autobind
  joinChannel(){
    if(!this.props.active){
      this.props.join(this.props.channel);
    }
  }

  render(){
    const {
      channel,
      active,
    } = this.props;

    return <span className={classnames({channel: true, 'chat-channel-active': active})} onClick={this.joinChannel}>#{channel.name}</span>
  }
}