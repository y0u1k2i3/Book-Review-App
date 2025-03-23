import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
  userName: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignIn = true;
      state.userName = action.payload;
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.userName = "";
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    }
  },
});

export const { signIn, signOut, updateUserName } = authSlice.actions;
