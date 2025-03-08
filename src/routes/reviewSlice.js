import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    page: 0,
  },
  reducers: {
    nextpage: (state) => {
      state.page += 1;
    },
    prevpage: (state) => {
      state.page -= 1;
    },
  },
  //自動で同じ名前のAction Creatorが作成される。
});

export const { nextpage, prevpage } = reviewSlice.actions; //actionCreatorのこと
