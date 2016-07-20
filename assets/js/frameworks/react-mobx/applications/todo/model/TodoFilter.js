export default class TodoFilter{
  name;
  passes;

  constructor(name, passes){
    this.name = name;
    this.passes = passes;
  }

}

TodoFilter.ALL_FILTERS = [
  new TodoFilter('All', (todo) => true),
  new TodoFilter('Completed', (todo) => todo.finished),
  new TodoFilter('Pending', (todo) => !todo.finished)
];