import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      This is the Home Page
      <Link to="/dashboard">Link to Dashboard</Link>
    </div>
  );
}

export default Home;
