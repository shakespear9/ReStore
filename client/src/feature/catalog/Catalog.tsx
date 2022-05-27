import { Button } from "@mui/material";
import React from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface CatalogProps {
  products: Product[];
  addProduct: () => void;
}

const Catalog = ({ products, addProduct }: CatalogProps) => {
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained" onClick={addProduct}>
        Add Product
      </Button>
    </>
  );
};

export default Catalog;
