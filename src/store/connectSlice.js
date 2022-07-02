import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  address: null,
};

export const connectSlice = createSlice({
  name: "connect",
  initialState,
  reducers: {
    connectPolkadot: (state) => {
      state.connected = true;
    },
    disConnectPolkadot: (state) => {
      state.connected = false;
    },
    setAddress: (state, actions) => {
      state.address = actions.payload;
    },
  },
});

export const { connectPolkadot, disConnectPolkadot, setAddress } =
  connectSlice.actions;

export default connectSlice.reducer;
