function TodoList(props) {
  const { todo, updateTodo, deleteTodo } = props;

  return (
    <div className="todo-list">
      <input type="checkbox" onClick={() => updateTodo(todo.id)} />
      <li className={todo.completed ? "completed": ""}>{todo.name}</li>
      <span onClick={() => deleteTodo(todo.id)}>X</span>
    </div>
  );
}

export default TodoList;
