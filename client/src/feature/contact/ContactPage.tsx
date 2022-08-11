import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CounterState,
  decrement,
  DECREMENT_COUNTER,
  increment,
  INCREMENT_COUNTER,
} from "./counterReducer";

const ContactPage = () => {
  const dispatch = useDispatch();
  const { data, title } = useSelector((state: CounterState) => state);

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">{data}</Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: INCREMENT_COUNTER })}
          color="primary"
        >
          Increment
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: DECREMENT_COUNTER })}
          color="error"
        >
          Decrement
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(increment(5))}
          color="secondary"
        >
          Increment by 5
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(decrement(5))}
          color="info"
        >
          Decrement by 5
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ContactPage;
