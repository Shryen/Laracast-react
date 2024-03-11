import { useRef } from 'react';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  // const [todos, setTodos] = useState([
  //   { id: 1, title: 'Test todo', isComplete: false },
  // ]);
  // const [name, setName] = useState('');
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
  // const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);
    setIdForTodo(previdForTodo => previdForTodo + 1);
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

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  function deleteToDo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  // use useMemo when something has a return value and to get that return value takes a long time

  useEffect(() => {
    nameInputEl.current.focus();

    // setName(JSON.parse(localStorage.getItem('name')) ?? '');
    console.log(localStorage.getItem('name'));

    return function cleanup() {
      // console.log('cleanup');
    };
  }, []);

  function handleNameInput(e) {
    setName(e.target.value);
    // localStorage.setItem('name', JSON.stringify(e.target.value));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h1>Todo App</h1>
        <hr />
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              ref={nameInputEl}
              name="username"
              className="todo-input"
              placeholder="What is your name?"
              value={name}
              onChange={handleNameInput}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeToDo={completeToDo}
            markAsEditing={markAsEditing}
            updateToDo={updateToDo}
            cancelEdit={cancelEdit}
            deleteToDo={deleteToDo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
