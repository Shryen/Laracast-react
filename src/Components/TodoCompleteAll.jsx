import React, { useContext } from 'react';
import { TodosContext } from '../Context/TodosContext';

export default function TodoCompleteAll() {
  const { todos, setTodos } = useContext(TodosContext);
  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }
  return (
    <div>
      <div onClick={completeAllTodos} className="button">
        Check All
      </div>
    </div>
  );
}
