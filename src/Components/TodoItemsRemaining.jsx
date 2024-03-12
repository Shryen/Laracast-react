import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../Context/TodosContext';

export default function TodoItemsRemaining(props) {
  const { todos } = useContext(TodosContext);

  function remainingCalc() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  // use useMemo when something has a return value and to get that return value takes a long time
  const remaining = useMemo(remainingCalc, [todos]);

  return (
    <div>
      <span>{remaining} items remaining</span>
    </div>
  );
}
