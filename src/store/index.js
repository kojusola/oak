import { configureStore } from "@reduxjs/toolkit";
import connectReducer from "./connectSlice";

export const store = configureStore({
  reducer: { connect: connectReducer },
});
