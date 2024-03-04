import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
  addTodo: PropTypes.func,
};

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');

  function handleInput(event) {
    setTodoInput(event.target.value); // Get the input value of Todo
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }

    props.addTodo(todoInput);
    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
