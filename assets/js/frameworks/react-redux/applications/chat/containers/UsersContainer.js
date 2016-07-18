import { Component } from 'react';
import { connect } from 'react-redux';

import Users from '../components/Users';

function mapStateToProps({store: {users}}){
  return {
    users
  };
}

@connect(mapStateToProps)
export default class UsersContainer extends Component{
  render(){
    return <Users {...this.props}/>;
  }
}