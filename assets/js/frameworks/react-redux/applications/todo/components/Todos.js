import Todo from './Todo';

export default ({
  todos,
  toggleAll,
  hasPendingTodos
}) => {
  const todoElements = todos.map(todo => <li key={todo._id}><Todo {...{todo}}/></li>)
  return <ul className="todo-list">
    <li>
      <div className="todo-item">
        <input type="checkbox" checked={hasPendingTodos} onChange={toggleAll} className="todo-checkbox"/>
      </div>
    </li>
    {todoElements}
  </ul>
}