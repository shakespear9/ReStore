import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();
  const location = useLocation();
  const state: any = location.state;

  console.log(state);

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h3" color={"error"} gutterBottom>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography>
            {state.error.detail || "internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>Go back to the store</Button>
    </Container>
  );
}
