import React, { useState } from "react";

function MergeState() {
  
  const [user, setUser] = useState({
    name: "John",
    age: 30,
  });

  return (
    <div>
      {/**Merging state using functionnal updates because state changes on each text change */}
      <input
        type="text"
        defaultValue={user.name}
        onChange={(event) => {
          setUser((oldUser) => ({
            ...oldUser,
            name: event.target.value,
          }));
        }}
      ></input>
      {/** Merging using spread operator */}
      <input
        type="date"
        onChange={(event) => {
          setUser({
            ...user,
            birthday: event.target.value,
          });
        }}
      ></input>
      <pre>
        <code lang="json">{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}

export default MergeState;
