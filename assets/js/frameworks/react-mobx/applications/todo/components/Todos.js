import { Component } from 'react';
import { observer } from 'mobx-react';

import Todo from './Todo';

@observer
export default class Todos extends Component{
  render(){
    const {
      store
    } = this.props;

    const todos = store.visibleTodos;

    const todoElements = todos.map(todo => <li key={todo._id}><Todo {...{store, todo}}/></li>);

    return <ul className="todo-list">
      <li>
        <div className="todo-item">
          <input type="checkbox" checked={store.pendingCount === 0} onChange={store.toggleAll} className="todo-checkbox"/>
        </div>
      </li>
      {todoElements}
    </ul>

  }
}