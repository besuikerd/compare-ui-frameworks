import { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import TodoFilter from '../model/TodoFilter';

@observer
export default class TodoFilters extends Component{
  render(){
    const {
      store: {
        filter: activeFilter,
        setFilter
      }
    } = this.props;

    const filterElements = TodoFilter.ALL_FILTERS.map(filter => <button key={filter.name} className={classNames({
      'todo-filter': true,
      'todo-filter-active': activeFilter.name === filter.name
    })} onClick={() => setFilter(filter)}>
      { filter.name }
    </button>);

    return <span className="todo-filters">
      {
        filterElements
      }
    </span>
  }
}
