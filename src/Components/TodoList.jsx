import React from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import { useState } from 'react';

export default function TodoList(props) {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <ul className="todo-list">
        {props.todosFiltered(filter).map((todo, index) => (
          <li className="todo-item-container" key={todo.id}>
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => props.completeToDo(todo.id)}
                checked={todo.isComplete ? true : false}
              />

              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  onBlur={event => props.updateToDo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      props.updateToDo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      props.cancelEdit(todo.id);
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
            <button
              onClick={() => props.deleteToDo(todo.id)}
              className="x-button"
            >
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
        <TodoCompleteAll completeAllTodos={props.completeAllTodos} />

        <TodoItemsRemaining remaining={props.remaining} />
      </div>

      <div className="other-buttons-container">
        <TodoFilters
          todosFiltered={props.todosFiltered}
          filter={filter}
          setFilter={setFilter}
        />
        <div>
          <TodoClearCompleted clearCompleted={props.clearCompleted} />
        </div>
      </div>
    </>
  );
}
