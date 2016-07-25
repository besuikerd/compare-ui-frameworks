export const filterNames = {
  all: 'All',
  completed: 'Completed',
  pending: 'Pending'
};

const filters  = {};
filters[filterNames.all] = (todo) => true;
filters[filterNames.completed] = (todo) => todo.finished;
filters[filterNames.pending] = (todo) => !todo.finished;

export default filters;

