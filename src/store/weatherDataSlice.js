import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
