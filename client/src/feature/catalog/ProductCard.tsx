import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
  Avatar,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import LoadingButton from "@mui/lab/LoadingButton";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const { setBasket } = useStoreContext();

  const handleAddItem = (productId: number) => {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        component="img"
        height="140"
        sx={{
          backgroundSize: "contain",
          bgcolor: "primary.light",
          objectFit: "contain",
        }}
        image={product.pictureUrl}
        alt={product.name}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          size="small"
          onClick={() => handleAddItem(product.id)}
        >
          Add To cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
