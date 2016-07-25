import { Component } from 'react';
import { observer } from 'mobx-react';

import TodoInput from './TodoInput';
import Todos from './Todos';
import TodoFooter from './TodoFooter';

@observer
export default class App extends Component{
  render(){
    const { store } = this.props;

    return <div className="todo-panel">
      <TodoInput store={store.todoInput}/>
      <Todos {...{store}}/>
      <hr/>
      <TodoFooter {...{store}}/>
    </div>
  }
}