import { useRef, useState } from 'react';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../Context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
  const [filter, setFilter] = useState('all');

  function todosFiltered() {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();
    console.log(localStorage.getItem('name'));
    return function cleanup() {
      // console.log('cleanup');
    };
  }, []);

  function handleNameInput(e) {
    setName(e.target.value);
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        filter,
        setFilter,
        todosFiltered,
      }}
    >
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
            <CSSTransition
              in={name.length > 0}
              timeout={300}
              classNames="slide-horizontal"
              unmountOnExit
            >
              <p className="name-label">Hello, {name}</p>
            </CSSTransition>
          </div>

          <TodoForm />
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={todos.length > 0}
              timeout={300}
              classNames={'slide-vertical'}
              unmountOnExit
            >
              {todos.length > 0 ? <TodoList /> : <NoTodos />}
            </CSSTransition>
          </SwitchTransition>
          {/* <CSSTransition
            in={todos.length > 0}
            timeout={300}
            classNames={'slide-vertical'}
            unmountOnExit
          >
            <TodoList />
          </CSSTransition>
          <CSSTransition
            in={todos.length === 0}
            timeout={300}
            classNames={'slide-vertical'}
            unmountOnExit
          >
            <NoTodos />
          </CSSTransition> */}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
