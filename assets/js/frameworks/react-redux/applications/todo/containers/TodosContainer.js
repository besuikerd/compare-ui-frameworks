import { Component } from 'react';
import { connect } from 'react-redux';

import todo from '../actions/todo';
import Todos from '../components/Todos';
import { visibleTodos, pendingTodos } from '../model/Todo';

function mapStateToProps({store, todos}){

  return {
    visibleTodos: visibleTodos(todos, store.filter),
    hasPendingTodos: pendingTodos(todos).length > 0
  }
}

function mapDispatchToProps(dispatch){
  return {
    toggleAll: () => dispatch(todo.toggleAll()),
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class TodosContainer extends Component {
  render() {
    const {
      visibleTodos,
      toggleAll,
      hasPendingTodos
    } = this.props;

    return <Todos {...{todos: visibleTodos, toggleAll, hasPendingTodos}}/>;
  }
}