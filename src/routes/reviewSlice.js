import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    offset: 0,
  },
  reducers: {
    nextpage: (state) => {
      state.offset += 10;
    },
    prevpage: (state) => {
      state.offset -= 10;
    },
  },
  //自動で同じ名前のAction Creatorが作成される。
});

export const { nextpage, prevpage } = reviewSlice.actions; //actionCreatorのこと
