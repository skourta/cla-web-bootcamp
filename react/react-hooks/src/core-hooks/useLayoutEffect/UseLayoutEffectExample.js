import React, { useEffect, useLayoutEffect } from "react";

function UseLayoutEffectExample() {
  //TODO Swap useLayoutEffect with useEffect to see the difference.
  useLayoutEffect(() => {
    // Computation intensive update.  
    let x;
    for (let i = 0; i < 100000000; i++) {
      x = i * 2;
    }
    // mutating DOM
    document.getElementById("box").style.backgroundColor = "blue";
  });

  return (
    <div>
      <div id="box" style={{ backgroundColor: "red", width: 300, height: 300 }}>
        BOX
      </div>
    </div>
  );
}

export default UseLayoutEffectExample;
