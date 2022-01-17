import React from "react";

function useWindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

function UseScreenSizeExample() {
  const { height, width } = useWindowSize();
  return (
    <div>
      Window is: {width}x{height}
    </div>
  );
}

export default UseScreenSizeExample;
