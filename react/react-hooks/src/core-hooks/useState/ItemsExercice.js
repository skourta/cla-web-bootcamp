import React, { useState } from "react";

const getSortedItems = (items) =>
  items?.slice().sort((a, b) => a.localeCompare(b)); /// Local compare allows us to compare strings: -1 if before, 1 if after, 0 if equal

function ItemsExercice({ initialItems }) {
  const [items, setItems] = useState(() => getSortedItems(initialItems));
  const [text, setText] = useState("");

  const addNewItem = () => {
    if (!text) return;
    const newItems = getSortedItems([...items, text]);
    setItems(newItems);
    setText(""); // clearing the input field
  };
  return (
    <div>
      {items?.length > 0 ? (
        <>
          <span>Items</span>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <span>No items added</span>
      )}

      <div>
        <input
          value={text}
          placeholder="Add new text item"
          onChange={(event) => setText(event.target.value)}
        ></input>
        <button onClick={addNewItem}>Add</button>
      </div>
    </div>
  );
}

export default ItemsExercice;
