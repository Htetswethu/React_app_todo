import React from "react";
import Todo from "./Todo";

export default function Todolist({ todos, deleteTodo, updateTodo }) {
  return (
    <ul className="todo-list">
      {todos &&
        todos.map((todo) => (
          <Todo
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}          
            key={todo.id}
          />
        ))}
    </ul>
  );
}
