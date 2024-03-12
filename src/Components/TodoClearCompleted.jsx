import React, { useContext } from 'react';
import { TodosContext } from '../Context/TodosContext';

export default function TodoClearCompleted(props) {
  const { todos, setTodos } = useContext(TodosContext);
  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }
  return (
    <div>
      <button onClick={clearCompleted} className="button">
        Clear completed
      </button>
    </div>
  );
}
