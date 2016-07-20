import { Component } from 'react';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';

@observer
export default class Todo extends Component{

  @autobind
  updateTask(e){
    this.props.store.updateTask(e.target.value);
  }

  @autobind
  submitEditedTask(e){
    if(e.key === 'Enter'){
      const{
        setTodoBeingEdited,
        updateTodoBeingEdited
      } = this.props.store;
      updateTodoBeingEdited();
      setTodoBeingEdited(null);
    }
  }

  render(){
    const {
      todo,
      store
    } = this.props;

    const {
      todoBeingEdited,
      setTodoBeingEdited,
      deleteTodo,
      toggleTodo
    } = store;

    const {
      _id,
      task,
      finished
    } = todo;


    return <div>
      <input type="checkbox" checked={finished} onChange={() => toggleTodo(todo)}/>
      {
        todoBeingEdited !== null && todoBeingEdited._id === _id ?
          <input type="text" value={todoBeingEdited.task} onChange={this.updateTask} onKeyPress={this.submitEditedTask}/>
        :
          <div onDoubleClick={() => setTodoBeingEdited(todo)}>{todo.task}</div>
      }
      <button onClick={() => deleteTodo(todo)}>X</button>
    </div>
  }
}