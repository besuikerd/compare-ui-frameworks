import { Component } from 'react';
import { observer } from 'mobx-react';

export default class User extends Component{
  render(){
    const {
      user
    } = this.props;

    return <div>{user.name}</div>
  }
}