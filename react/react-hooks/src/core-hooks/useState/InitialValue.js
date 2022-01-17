import React from "react";

function InitialValue() {
  const [randomBigValue, setRandomBigValue] = React.useState(() => {
    let sum = 0;

    for (let i = 0; i < 10000; i++) {
      sum += Math.ceil(Math.random() * 2151331515);
    }
    // this is the initial state
    return sum;
  });
  return (
    <button onClick={() => setRandomBigValue(randomBigValue + 1)}>
      randomBigValue is : {randomBigValue}
    </button>
  );
}

export default InitialValue;
