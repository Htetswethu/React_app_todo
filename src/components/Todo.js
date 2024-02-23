import React, { useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo }) {
  let [isEdit, setIsEdit] = useState(false);
  let [title, setTitle] = useState(todo.title);

  let updateHandler = (e) => {
    e.preventDefault();
    let data = {
      id: todo.id,
      title,
      completed: todo.completed,
    };
    updateTodo(data);
    setIsEdit(false);
  };

  let changeTodo = ()=>{
    let data = {
      id: todo.id,
      title,
      completed: !todo.completed,
    };
    updateTodo(data);
  }
  

  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" checked={todo.completed} onChange={changeTodo} />
        {!isEdit && (
          <span
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={updateHandler}>
            <input
              type="text"
              className="todo-item-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </form>
        )}
      </div>
      {todo.completed && <button className="x-button" onClick={() => deleteTodo(todo.id)}>
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
      </button>}
    </li>
  );
}
