import { Component } from 'react';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import classnames from 'classnames';

@observer
export default class Todo extends Component{

  constructor(props){
    super(props);
    this.state = {
      hovered: false
    };
  }

  @autobind
  updateTask(e){
    this.props.store.updateTask(e.target.value);
  }

  @autobind
  submitEditedTask(){
    const{
      setTodoBeingEdited,
      updateTodoBeingEdited
    } = this.props.store;
      updateTodoBeingEdited();
      setTodoBeingEdited(null);
  }

  @autobind
  onDoubleClick(){
    this.props.store.setTodoBeingEdited(this.props.todo);
    setTimeout(() => this.refs.input.focus(), 0)
  }

  @autobind
  onKeyPress(e){
    if(e.key === 'Enter') {
      this.submitEditedTask()
    }
  }

  @autobind
  onMouseEnter(){
    this.setState({hovered: true})
  }

  @autobind
  onMouseLeave(){
    this.setState({hovered: false});
  }

  @autobind
  onBlur(){
    const {
      todo,
      store: {
        setTodoBeingEdited,
        todoBeingEdited,
        textInput
      }
    } = this.props;
    if(todoBeingEdited.task !== textInput){
      this.submitEditedTask()
    }

  }

  render(){
    const {
      todo,
      store
    } = this.props;

    const {
      todoBeingEdited,
      deleteTodo,
      toggleTodo
    } = store;

    const {
      _id,
      task,
      finished
    } = todo;

    const {
      hovered
    } = this.state;

    const taskClassName = classnames({'todo-task': true, 'todo-finished': finished});

    return <div className="todo-item" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
      <input className="todo-checkbox" type="checkbox" checked={finished} onChange={() => toggleTodo(todo)}/>
      {
        todoBeingEdited !== null && todoBeingEdited._id === _id ?
          <input ref="input" className={taskClassName} type="text" value={todoBeingEdited.task} onChange={this.updateTask} onKeyPress={this.onKeyPress} onBlur={this.onBlur}/>
        :
          <span className={taskClassName} onDoubleClick={this.onDoubleClick}>{todo.task}</span>
      }

      <button className={classnames({'todo-remove': true, 'todo-remove-hovered': hovered})} onClick={() => deleteTodo(todo)}>✕</button>
    </div>
  }
}