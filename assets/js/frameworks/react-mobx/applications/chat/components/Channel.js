import { Component } from 'react';
import { autobind } from 'core-decorators';

export default class Channel extends Component{

  @autobind
  joinChannel(){
    this.props.join(this.props.channel);
  }

  render(){
    const {
      channel,
      active,
    } = this.props;

    return <span enabled={!active} onClick={this.joinChannel}>#{channel.name}</span>
  }
}