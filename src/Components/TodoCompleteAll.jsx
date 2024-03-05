import React from 'react';

export default function TodoCompleteAll(props) {
  return (
    <div>
      <div onClick={props.completeAllTodos} className="button">
        Check All
      </div>
    </div>
  );
}
