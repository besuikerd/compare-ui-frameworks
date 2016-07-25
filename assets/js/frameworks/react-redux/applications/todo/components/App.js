import { Component } from 'react';
import { connect } from 'react-redux';

import TodoInputContainer from '../containers/TodoInputContainer';
import TodosContainer from '../containers/TodosContainer';
import TodoFooterContainer from '../containers/TodoFooterContainer';

export default () => {
    return <div className="todo-panel">
      <TodoInputContainer/>
      <TodosContainer/>
      <hr/>
      <TodoFooterContainer/>
    </div>
}