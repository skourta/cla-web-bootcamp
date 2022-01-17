import React from "react";

function useRenders() {
  const renders = React.useRef(0);
  React.useEffect(() => renders.current++);
  return renders.current;
}

function UseRendersExample() {
  
  // this counter will update whenever the component renders for any reason including updating the clicks state
  const renders = useRenders();

  const [clicks, setClicks] = React.useState(0);

  return (
    <button onClick={() => setClicks(clicks + 1)}>Renders: {renders} </button>
  );
}

export default UseRendersExample;
