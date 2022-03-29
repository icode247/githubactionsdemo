import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

Session.addAxiosInterceptors(axios);

function Todo() {
  // const { email, accessTokenPayload } = useSessionContext();
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  const BASE_URL = "https://backend-silk-ten.vercel.app";

  useEffect(() => {
    async function getTodos() {
      // use axios as you normally do
      let response = await axios.get(`${BASE_URL}/api/v1/todos`);
      setTodos(response.data);
    }
    getTodos();
  }, [todos]);

  function handleChange(e) {
    setName(e.target.value);
  }

  async function handleCreate() {
    await axios.post(`${BASE_URL}/api/v1/todos`, { name });
    setName("");
  }

  async function handleUpdate(id) {
    await axios.patch(`${BASE_URL}/api/v1/todos/${id}`);
  }

  async function handleDelete(id) {
    axios.delete(`${BASE_URL}/api/v1/todos/${id}`);
  }

  async function handleLogout() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <div className="container">
      <div className="header">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main">
        <div className="todo-header">
          <h4>The Day Todos</h4>
        </div>
        <div className="todo-body">
          <input
            className="task"
            value={name}
            onChange={handleChange}
            onKeyPress={(e) => e.key === "Enter" && handleCreate()}
          ></input>
          <ul>
            {todos.map((todo) => (
              <TodoList
                todo={todo}
                updateTodo={handleUpdate}
                deleteTodo={handleDelete}
                key={todo.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
