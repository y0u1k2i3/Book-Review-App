import { configureStore } from "@reduxjs/toolkit";
import { reviewSlice } from "./reviewSlice";

export const store = configureStore({
  reducer: {
    review: reviewSlice,
  },
});
