import React from 'react';

export default function TodoItemsRemaining(props) {
  return (
    <div>
      <span>{props.remaining()} items remaining</span>
    </div>
  );
}
