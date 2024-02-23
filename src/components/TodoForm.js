import React, { useState } from "react";

export default function Todoform({ add_todo }) {
  let [title, setTitle] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      id: Math.random().toString(),
      title,
      completed: false,
    };
    add_todo(data);
    setTitle("");
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
}
