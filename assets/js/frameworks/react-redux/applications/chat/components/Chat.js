import { Component } from 'react';

import Loading from './Loading';

import ChannelsContainer from '../containers/ChannelsContainer';
import UsersContainer from '../containers/UsersContainer';
import MessagesContainer from '../containers/MessagesContainer';


export default ({
  loading,
  logout
}) => {
  return <div className="chat">
    <Loading visible={loading}/>
    <div className="chat-panel">
      <ChannelsContainer/>
      <UsersContainer/>
      <div className="chat-logout">
        <button className="pure-button pure-button-secondary" onClick={logout}>Logout</button>
      </div>
    </div>
    <div className="chat-message-panel">
      <MessagesContainer/>
    </div>
  </div>;
}