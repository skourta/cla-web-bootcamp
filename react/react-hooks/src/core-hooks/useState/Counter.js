import React from "react";

function MyCounterComponent() {
  const [counter, setCounter] = React.useState(0);
  return (
    <button onClick={() => setCounter(counter + 1)}>
      Count is : {counter}
    </button>
  );
}

export default MyCounterComponent;
