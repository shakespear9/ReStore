import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Props {
  message?: string;
}

const LoadingComponent = ({ message = "Loading..." }: Props) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        height="100vh"
        flexDirection={"column"}
      >
        <CircularProgress size={100} color="secondary" sx={{ mb: 4 }} />
        <Typography variant="h4" sx={{ justifyContent: "center" }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingComponent;
