import { Component } from 'react';
import { connect } from 'react-redux';

import store from '../actions/store';

import Channels from '../components/Channels';

function mapStateToProps({store: {channels, channel}}){
  return {
    channels,
    activeChannel: channel
  };
}

function mapDispatchToProps(dispatch){
  return {
    joinChannel(channel){
      dispatch(store.joinChannel(channel))
    }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ChannelsContainer extends Component{

  render(){
    return <Channels {...this.props}/>
  }
}