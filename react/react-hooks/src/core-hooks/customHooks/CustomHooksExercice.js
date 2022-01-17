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

function CustomHooksExercice() {
  const { data, loading, error, refresh } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  if (error) return <span>Error Loading Todos ❌</span>;
  if (loading) return <span>Loading Todos ...</span>;
  else
    return (
      <>
        <button onClick={refresh}>refresh</button>
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              {todo.title} :{" "}
              <input type="checkbox" readOnly checked={todo.completed}></input>
            </li>
          ))}
        </ul>
      </>
    );
}

export default CustomHooksExercice;
