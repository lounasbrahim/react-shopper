import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

import ProductItem from "../components/ProductItem";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductList() {
  const { data: products, isLoading } = useQuery("Products", () =>
    axios.get("/api/products").then((res) => res.data.products)
  );

  if (isLoading) return <LoadingSpinner />;

  return products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));
}
