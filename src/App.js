import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import CheckAllContainer from "./components/CheckAllContainer.js";
import FilterButton from "./components/FilterButton.js";
import ClearCompleted from "./components/ClearCompleted.js";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [filterTodos, setFilterTodos] = useState(todos);

  //fetch api
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
        setFilterTodos(data);
      });
  }, []);

  let filterBy = useCallback((filter) => {
    if (filter === "All") {
      setFilterTodos(todos);
    }
    if (filter === "Active") {
      setFilterTodos(todos.filter((t) => !t.completed));
    }
    if (filter === "Completed") {
      setFilterTodos(todos.filter((t) => t.completed));
    }
  },[todos]);

  let add_todo = (todo_data) => {
    //update data in server side
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo_data),
    });
    //update data in client side
    setTodos((prevState) => [...prevState, todo_data]);
  };

  let deleteTodo = (TodoId) => {
    //update data in server side
    fetch(`http://localhost:3000/todos/${TodoId}`, {
      method: "DELETE",
    });
    //update data in client side
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== TodoId;
      });
    });
  };

  let updateTodo = (update_todo) => {
    //update data in server side
    fetch(`http://localhost:3000/todos/${update_todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update_todo),
    });
    //update data in client side
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === update_todo.id) {
          return update_todo;
        }
        return t;
      });
    });
  };

  let checkAll = () => {
    //update data in server side
    todos.forEach((todo) => {
      todo.completed = true;
      updateTodo(todo); //updating each todo list in FOR EACH METHOD
    });

    //update data in client side
    setTodos((prevState) => {
      return prevState.map((t) => {
        return {
          ...t,
          completed: true,
        };
      });
    });
  };

  let remainCount = todos.filter((t) => !t.completed).length;

  let clearCompleted = () => {
    //update data in server side
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
    //update data in client side
    setTodos((prevState) => {
      return prevState.filter((t) => {
        return !t.completed;
      });
    });
  };



  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm add_todo={add_todo} />
        <TodoList
          todos={filterTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <CheckAllContainer checkAll={checkAll} remainCount={remainCount} />
        <div className="other-buttons-container">
          <FilterButton filterBy={filterBy} />
          <ClearCompleted clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
