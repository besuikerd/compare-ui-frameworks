import { observable } from 'mobx';
import $ from 'jquery';

export default class TodoInputModel{

  todos;

  @observable
  textInput = '';

  constructor(todos){
    this.todos = todos;
  }

  addTodo(){
    $.post('/api/todos', {task: this.textInput, finished: false});
    this.textInput = '';
  }

  setTextInput(textInput){
    this.textInput = textInput;
  }
}