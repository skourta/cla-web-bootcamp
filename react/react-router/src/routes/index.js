import React from "react";
import { Link,NavLink } from "react-router-dom";
function Index() {
  return (
    <div>
      Index Page
      <ul>
        <li>
          <NavLink
            to={{
              pathname: "/home",
            }}
            state={{data : "some data"}}
            
          >
            Home Page
          </NavLink>
        </li>
        <li>
          <Link to="/dashboard">Dashboard Page</Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;
