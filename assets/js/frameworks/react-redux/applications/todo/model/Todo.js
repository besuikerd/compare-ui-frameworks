import TodoFilters from './TodoFilters'

export function visibleTodos(todos, filter) {
  return todos.filter(TodoFilters[filter]);
}

export function pendingTodos(todos){
  return todos.filter(todo => !todo.finished)
}
