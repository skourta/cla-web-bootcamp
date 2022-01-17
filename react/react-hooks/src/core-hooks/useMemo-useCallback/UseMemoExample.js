import React, { useState, useMemo } from "react";

function UseMemoExample({ text }) {
  const [longText, setLongText] = useState(text);

  const [check, setChecked] = useState(false);

  const reversed = useMemo(() => {
    console.log("Reversing");
    return longText.split("").reverse().join("");
  }, [longText]);
  return (
    <div>
      <p>Normal Long Text : {longText}</p>
      <p>Reversed Long Text : {reversed}</p>

      <input
        type="checkbox"
        value={check}
        checked={check}
        onChange={(e) => setChecked(e.target.checked)}
      ></input>

      <input
        type="text"
        value={longText}
        onChange={(e) => setLongText(e.target.value)}
      ></input>
    </div>
  );
}

export default UseMemoExample;
