import { useState } from 'react';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);
    setIdForTodo(previdForTodo => previdForTodo + 1);
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

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
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

  function deleteToDo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeToDo={completeToDo}
            markAsEditing={markAsEditing}
            updateToDo={updateToDo}
            cancelEdit={cancelEdit}
            deleteToDo={deleteToDo}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
