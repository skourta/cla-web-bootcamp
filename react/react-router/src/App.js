import React from "react";
import { Routes, Route } from "react-router-dom";
import EditParts from "./nested_routes/EditParts";
import Product from "./nested_routes/Product";
import ProductParts from "./nested_routes/ProductParts";
import Products from "./nested_routes/Products";
import ProductSummary from "./nested_routes/ProductSummary";
import Index from "./routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />

      <Route path="products" element={<Products />}>
        <Route path=":id" element={<Product />}>
          <Route path="summary" element={<ProductSummary />} />
          <Route path="parts" element={<ProductParts />}>
            <Route path="edit" element={<EditParts />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
