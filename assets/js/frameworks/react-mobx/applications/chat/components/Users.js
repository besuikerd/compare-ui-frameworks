import { Component } from 'react';
import { observer } from 'mobx-react';

import User from './User';

@observer
export default class Users extends Component{
  render(){
    const {
      users
    } = this.props;


    console.log(users.map(u => u._id));
    const userElements = users.map(user => <li key={user._id}><User {...{user}}/></li>)

    return <div className="chat-users">
      <h2 className="chat-panel-header">Users</h2>
      <ul className="pure-menu-list chat-user-list">
        { userElements }
      </ul>
    </div>
  }

}