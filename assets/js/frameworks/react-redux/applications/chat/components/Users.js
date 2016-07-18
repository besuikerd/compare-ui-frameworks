import { Component } from 'react';

import User from './User';

export default ({ users }) => {
  const userElements = users.map(user => <li key={user._id}><User {...{user}}/></li>)

  return <div className="chat-users">
    <h2 className="chat-panel-header">Users</h2>
    <ul className="pure-menu-list chat-user-list">
      { userElements }
    </ul>
  </div>
}