import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => res.data.products)
      .then((products) => setProducts(products));
  });

  return products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));
}
