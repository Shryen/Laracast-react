import React from 'react';

export default function TodoClearCompleted(props) {
  return (
    <div>
      <button onClick={props.clearCompleted} className="button">
        Clear completed
      </button>
    </div>
  );
}
