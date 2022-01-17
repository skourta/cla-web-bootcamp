import React from "react";
import { Outlet } from "react-router-dom";

function Products() {
  return (
    <div>
      Products
      <Outlet />
    </div>
  );
}

export default Products;
