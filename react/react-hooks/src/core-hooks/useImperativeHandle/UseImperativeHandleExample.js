import React, { forwardRef, useEffect, useImperativeHandle } from "react";

const FancyInput = forwardRef((props, ref) => {
  const inputRef = React.useRef();
  const labelRef = React.useRef();

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current.focus();
        labelRef.current.style.color = "blue";
      },
      blur: () => {
        inputRef.current.blur();
        labelRef.current.style.color = "red";
      },
    }),
    []
  );

  return (
    <div>
      <label style={{ color: "red" }} ref={labelRef} htmlFor={props.id}>
        {props.label}
      </label>
      <input ref={inputRef}></input>
    </div>
  );
});

function UseImperativeHandleExample() {
  // The Parent element can control FancyInput through this ref, and can execute all functions returned from useImperativeHandle
  const ref = React.useRef();

  return (
    <div>
      <button
        onClick={() => {
          ref.current.focus();
        }}
      >
        Focus Fancy Input
      </button>
      <button onClick={() => ref.current.blur()}>Blur Fancy Input</button>
      <FancyInput ref={ref} id="input" label="Input Label"></FancyInput>
    </div>
  );
}

export default UseImperativeHandleExample;
