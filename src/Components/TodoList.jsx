import React, { useContext } from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';
import { TodosContext } from '../Context/TodosContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function TodoList() {
  const [oneVisible, setOneVisible] = useToggle();
  const [twoVisible, setTwoVisible] = useToggle(false);
  const { todosFiltered, todos, setTodos } = useContext(TodosContext);

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });
    setTodos(updatedTodos);
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

  function cancelEdit(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function deleteToDo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
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

  return (
    <>
      <TransitionGroup component="ul" className="todo-list">
        {todosFiltered().map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="slide-horizontal"
          >
            <li className="todo-item-container">
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
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="toggles-container">
        <button className="button" onClick={setOneVisible}>
          Features One Toggle
        </button>
        <button className="button" onClick={setTwoVisible}>
          Features Two Toggle
        </button>
      </div>

      <CSSTransition
        in={oneVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAll />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition
        in={twoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <TodoFilters />
          <div>
            <TodoClearCompleted />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
