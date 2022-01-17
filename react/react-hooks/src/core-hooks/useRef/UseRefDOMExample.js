import React, { useEffect, useRef } from "react";

function UseRefDOMExample() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current.focus();
  }, [inputRef?.current]);

  return <input ref={inputRef}></input>;
}

export default UseRefDOMExample;
