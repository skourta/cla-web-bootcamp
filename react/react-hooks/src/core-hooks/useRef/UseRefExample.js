import React, { useRef, useEffect } from "react";

function UseRefExample() {
  const renders = useRef(0);

  const [clicks, setClicks] = React.useState(0);

  useEffect(() => {
    console.log("Old renders: ", renders.current);
    renders.current++;
    console.log("New renders: ", renders.current);
  });

  
  return (
    <div>
      <button onClick={() => setClicks(clicks + 1)}> Clicks {clicks}</button>
    </div>
  );
}

export default UseRefExample;
