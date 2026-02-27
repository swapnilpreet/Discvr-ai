import React from "react";
import Card from "./Card";

const Product = ({ products }) => {
  return (
    <div className="grid">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Product;
