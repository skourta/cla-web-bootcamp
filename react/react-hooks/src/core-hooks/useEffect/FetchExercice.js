import React, { useState, useEffect } from "react";

function FetchExercice() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const { signal } = controller;

    fetch("https://jsonplaceholder.typicode.com/todos", { signal })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));

    return () => controller.abort(); // we abort the request if the component gets unmounted
  }, []);

  if (loading) return <span>Loading Todos ...</span>;
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title} :{" "}
          <input type="checkbox" readOnly checked={todo.completed}></input>
        </li>
      ))}
    </ul>
  );
}

export default FetchExercice;
