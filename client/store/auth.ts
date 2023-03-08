import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoggedIn: boolean } = {
  isLoggedIn: false,
};

export const reduxSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLogIn: (state) => {
      state.isLoggedIn = true;
    },
    setLogOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setLogIn, setLogOut } = reduxSlice.actions;

export default reduxSlice.reducer;
