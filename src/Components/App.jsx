import { useState } from 'react';
import '../App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Bevásárolni',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Tankolni',
      isComplete: true,
      isEditing: false,
    },
  ]);

  const [todoInput, setTodoInput] = useState('');
  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setTodoInput('');
    setIdForTodo(previdForTodo => previdForTodo + 1);
  }

  function handleInput(event) {
    setTodoInput(event.target.value); // Get the input value of Todo
  }

  function completeToDo(id) {
    const updatedTodos = todos.map(todo => {
      //map the array
      if (todo.id === id) {
        //find the array we need
        todo.isComplete = !todo.isComplete; //opposite of expression
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function updateToDo(event, id) {
    console.log(event.target.value);
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function deleteToDo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li className="todo-item-container" key={todo.id}>
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeToDo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />

                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    onBlur={event => updateToDo(event, todo.id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        updateToDo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        cancelEdit(todo.id);
                      }
                    }}
                    type="text"
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
                {/*  */}
              </div>
              <button onClick={() => deleteToDo(todo.id)} className="x-button">
                {' '}
                {/* Need to use callback function so it not runs on render */}
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
