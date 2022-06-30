import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  address: null,
};

export const connectSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    connect: (state) => {
      state.connected = true;
    },
    disConnect: (state) => {
      state.connected = false;
    },
    setAddress: (state) => {
      state.address = address;
    },
  },
});

// Action creators are generated for each case reducer function
export const { connect, disConnect } = connectSlice.actions;

export default connectSlice.reducer;