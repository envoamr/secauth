import { createSlice } from "@reduxjs/toolkit";

const initialState: { isDarkTheme: boolean } = {
  isDarkTheme: false,
};

export const reduxSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initTheme: (state) => {
      let localTheme = localStorage.getItem("darkmode");
      if (localTheme !== null) state.isDarkTheme = localTheme === "true" ? true : false;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      localStorage.setItem("darkmode", state.isDarkTheme.toString());
    },
  },
});

export const { initTheme, toggleTheme } = reduxSlice.actions;

export default reduxSlice.reducer;
