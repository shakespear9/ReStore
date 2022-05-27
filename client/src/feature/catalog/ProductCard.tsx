import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import React from "react";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={product.pictureUrl} />
      </ListItemAvatar>
      <ListItemText>
        {product.name} - {product.price}
      </ListItemText>
    </ListItem>
  );
};

export default ProductCard;
