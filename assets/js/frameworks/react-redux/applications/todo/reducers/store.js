import { filterNames } from '../model/TodoFilters';

export const initialState = {
  filter: filterNames.all
};

export default function store(state = initialState, action){
  switch(action.type){
    default:
      return state;
  }
}