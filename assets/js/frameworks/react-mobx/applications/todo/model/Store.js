import { observable, computed } from 'mobx';
import io from 'socket.io-client';
import { autobind } from 'core-decorators';
import $ from 'jquery';

import TodoFilter from './TodoFilter';
import TodoInputModel from './TodoInputModel';

export default class Store{
  @observable
  todos = [];

  @observable
  filter = TodoFilter.ALL_FILTERS[0];

  @observable
  todoBeingEdited = null;

  @observable
  textInput = '';

  todoInput = new TodoInputModel(this.todos);

  @computed
  get visibleTodos(){
    return this.todos.filter(this.filter.passes);
  }

  @computed
  get pendingCount(){
    return this.todos.reduce((sum, todo) => sum + (todo.finished ? 0 : 1), 0);
  }

  @computed
  get completedCount(){
    return this.todos.length - this.pendingCount;
  }

  @autobind
  setTextInput(text){
    this.textInput = textInput;
  }

  @autobind
  setTodoBeingEdited(todo){
    this.todoBeingEdited = todo;
  }

  @autobind
  updateTask(task){
    this.todoBeingEdited.task = task;
  }

  @autobind
  updateTodoBeingEdited(){
    $.ajax({
      url: `/api/todos/${this.todoBeingEdited._id}`,
      type: 'PUT',
      data: this.todoBeingEdited
    });
  }

  toggleTodo(todo){
    $.ajax({
      url: `/api/todos/${todo._id}`,
      type: 'PUT',
      data: Object.assign({}, todo, {finished: !todo.finished})
    });
  };

  @autobind
  toggleAll(){
    const query = {_id: {$in: this.visibleTodos.map(todo => todo._id)}};
    const update = {$set: {finished: this.pendingCount !== 0}};

    $.ajax({
      url: '/api/todos',
      type: 'PUT',
      data: JSON.stringify({query, update}),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    })
  }

  @autobind
  clearCompleted(){
    const query = {_id: {$in: this.todos.filter(todo => todo.finished).map(todo => todo._id)}};

    $.ajax({
      url: '/api/todos',
      type: 'DELETE',
      data: JSON.stringify({query}),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    })
  }

  deleteTodo(todo){
    $.ajax({
      url: `/api/todos/${todo._id}`,
      type: 'DELETE'
    });
  }

  @autobind
  setFilter(filter){
    this.filter = filter;
  }

  connect(){
    $.get('/api/todos', todos => {
      this.todos = todos;
    });

    const socket = io.connect('/todos', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 60000,
      reconnectionAttempts: 60
    });
    socket.on('create', todo => {
      this.todos.push(todo);
    });

    socket.on('delete', todo => {
      this.todos = this.todos.filter(t => t._id !== todo._id);
    });

    socket.on('update', todo => {
      this.todos = this.todos.map(t => t._id === todo._id ? todo : t);
    })
  }
}