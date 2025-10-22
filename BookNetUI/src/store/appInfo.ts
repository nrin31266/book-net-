import { createSlice } from "@reduxjs/toolkit";

const appInfoSlice = createSlice({
  name: "appInfo",
  initialState: {
    version: "1.0.0",
    name: "BookNet",
  },
  reducers: {
  },
});

export default appInfoSlice;