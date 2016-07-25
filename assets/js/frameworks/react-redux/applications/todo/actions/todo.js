import $ from 'jquery';
import io from 'socket.io-client';

export const actionTypes = {
  todoAdded: 'TODO_ADDED',
  todoRemoved: 'TODO_REMOVED',
  todoUpdated: 'TODO_UPDATED',
  setTodos: 'SET_TODOS'
};

function todoAdded(todo){
  return {
    type: actionTypes.todoAdded,
    todo
  }
}

function todoRemoved(todo){
  return{
    type: actionTypes.todoRemoved,
    todo
  }
}

function todoUpdated(todo){
  return {
    type: actionTypes.todoUpdated,
    todo
  }
}

function setTodos(todos){
  return {
    type: actionTypes.setTodos,
    todos
  }
}

function connect(){
  return (dispatch, getState) => {
    $.get('/api/todos').then((todos) => dispatch(setTodos(todos)));

    const socket = io.connect('/todos', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 60000,
      reconnectionAttempts: 60
    });

    socket.on('create', todo => {
      dispatch(todoAdded(todo));
    });

    socket.on('delete', todo => {
      dispatch(todoRemoved(todo));
    });

    socket.on('update', todo => {
      dispatch(todoUpdated(todo));
    })
  }
}

function toggleAll(){
  return (dispatch, getState) => {  
    const {
      todos
    } = getState();
  }
}

export default {
  todoAdded,
  todoRemoved,
  todoUpdated,
  setTodos,
  connect,
  toggleAll
};