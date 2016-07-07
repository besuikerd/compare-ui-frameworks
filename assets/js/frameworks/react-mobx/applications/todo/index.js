import { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import $ from 'jquery';

const Loading = () => {
  return <div>loading...</div>
}

const Todos = ({todos}) => {
  return <table className="pure-table">
    <thead>
      <th>
        Task
      </th>
      <th>
        Status
      </th>
    </thead>
    {
      todos.map(todo =>
        <tr key={todo._id}>
          <td>
            {todo.task}
          </td>
          <td>
            {todo.finished ? 'finished' : 'pending'}
          </td>
        </tr>
      )
    }
  </table>;
}
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    $.getJSON('/api/todos', (todos) =>
      this.setState({todos})
    );
  }

  render(){
    const {
      todos
    } = this.state;

    return todos ? <Todos {...{todos}}/> : <Loading/>
  }
}
