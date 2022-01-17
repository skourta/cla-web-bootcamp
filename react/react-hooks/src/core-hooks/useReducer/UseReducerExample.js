import React, { useReducer } from "react";

function counterReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "CLEAR":
      return 0;
    case "SET":
      return payload.value;
    default:
      return state;
  }
}

function UseReducerExample() {
  const [counter, dispatch] = useReducer(counterReducer, 0);

  const incrementCounter = () =>
    dispatch({
      type: "INCREMENT",
    });
    
  return <button onClick={incrementCounter}>Counter {counter}</button>;
}

export default UseReducerExample;
