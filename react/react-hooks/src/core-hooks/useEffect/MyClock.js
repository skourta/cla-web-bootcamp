import React, { useState, useEffect } from "react";

function Clock({ tries }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds((sec) => sec + 1), 1000);
    console.log("Interval with id: ", t);
    // when a new trie is made the function cleans up before unmounting the component
    return () => {
      console.log("Cleaning");
      // we reset the counter on each trie
      setSeconds(0);
      clearInterval(t);
    };
  }, [tries]);

  return <div>{seconds} seconds have passed</div>;
}

function MyClock() {
  const [tries, setTries] = useState(0);
  return (
    <div style={{ cursor: "pointer" }} onClick={() => setTries((t) => t + 1)}>
      <Clock tries={tries}></Clock>
    </div>
  );
}

export default MyClock;
