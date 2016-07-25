import { Component } from 'react';
import classnames from 'classnames';

import TodoFilters from './TodoFilters';

export default class TodoFooter extends Component{
  clearCompleted(e){
    e.preventDefault();
    this.props.store.clearCompleted();
  }

  render(){
    const {
      store
    } = this.props;

    const {
      pendingCount
    } = store;

    return <div className="todo-footer">
        <span>{pendingCount} todo{pendingCount !== 1 ? 's' : null} left</span>
        <TodoFilters {...{store}}/>
        {
          <a className={classnames({
            'todo-clear-completed': true,
            'todo-clear-completed-visible': store.completedCount > 0
          })} onClick={this.clearCompleted}>Clear Completed</a>
        }
      </div>
  }
}