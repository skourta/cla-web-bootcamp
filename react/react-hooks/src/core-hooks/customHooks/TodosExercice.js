import React from "react";

function useFetch(url) {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();

  const fetcher = React.useCallback(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const abortFetch = () => controller.abort();

    const promise = fetch(url, { signal });

    return [promise, abortFetch];
  }, [url]);

  const fetchHandler = React.useCallback(() => {
    setLoading(true);
    setError(null);
    const [response, abortRequest] = fetcher();
    response
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    return abortRequest;
  }, [fetcher]);

  React.useEffect(fetchHandler, [fetchHandler]);

  return {
    data,
    loading,
    error,
    refresh: fetchHandler,
  };
}

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

function useTodos() {
  const [todos, dispatch] = React.useReducer(todoReducer, []);
  const { data, loading, error, refresh } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  React.useEffect(() => {
    dispatch({
      type: "LOAD",
      payload: { data },
    });
  }, [data]);

  const filterOnlyComplete = () =>
    dispatch({ type: "FILTER", payload: { completed: true } });
  const filterOnlyUnComplete = () =>
    dispatch({ type: "FILTER", payload: { completed: false } });

  return {
    todos,
    loading,
    error,
    filterOnlyComplete,
    filterOnlyUnComplete,
    refresh,
  };
}

function TodosExercice() {
  const {
    todos,
    loading,
    error,
    filterOnlyComplete,
    filterOnlyUnComplete,
    refresh,
  } = useTodos();
  if (error) return <span>Error Loading Todos ❌</span>;
  if (loading) return <span>Loading Todos ...</span>;
  else
    return (
      <>
        <button onClick={refresh}>refresh</button>
        <button onClick={filterOnlyComplete}>Show only completed</button>
        <button onClick={filterOnlyUnComplete}>Show only uncompleted</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} :{" "}
              <input type="checkbox" readOnly checked={todo.completed}></input>
            </li>
          ))}
        </ul>
      </>
    );
}

export default TodosExercice;
