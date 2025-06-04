import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightMode: (state) => {
      state.mode = "light";
    },
    darkMode: (state) => {
      state.mode = "dark";
    },
  },
});

export const { lightMode, darkMode } = themeSlice.actions;

export default themeSlice.reducer;
