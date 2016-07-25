export const initialState = [];

import { actionTypes } from '../actions/todo'

export default function todos(state = initialState, action){
  switch(action.type){
    case actionTypes.todoAdded:
    {
      const {
        todo
      } = action;
      return [
        ...state,
        todo
      ];
    }

    case actionTypes.todoRemoved:
    {
      const {
        todo
      } = action;

      return state.filter(t => t._id !== todo._id);
    }
    case actionTypes.todoUpdated:
    {
      const {
        todo
      } = action;
      return state.map(t => t._id === todo._id ? todo : t);
    }

    case actionTypes.setTodos:
      return action.todos
    default:
      return state;
  }
}