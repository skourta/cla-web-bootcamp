import React, { useEffect, useReducer } from "react";

function todoReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOAD":
      return payload.data;

    case "FILTER":
      return state.filter((todo) => todo.completed === payload.completed);

    default:
      return state;
  }
}

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await res.json();
};

function UseReducerExercice() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    fetchTodos().then((todos) =>
      dispatch({ type: "LOAD", payload: { data: todos } })
    );
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({ type: "FILTER", payload: { completed: true } })
        }
      >
        Show only completed
      </button>
      <button
        onClick={() =>
          dispatch({ type: "FILTER", payload: { completed: false } })
        }
      >
        Show only uncompleted
      </button>
      <p>Notice how if you click both: you will have no items because the state has mutated through the reducer creating a new state</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} :{" "}
            <input type="checkbox" readOnly checked={todo.completed}></input>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseReducerExercice;
