import { configureStore } from "@reduxjs/toolkit";
import { reviewSlice } from "./reviewSlice";
import { authSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    review: reviewSlice.reducer,
    auth: authSlice.reducer,
  },
});

export { store };
