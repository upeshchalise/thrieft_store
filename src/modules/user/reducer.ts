/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";

import { ReduxUser } from "./type";
import { logoutUser, setUser, updateUser } from "./action";

export const initialState: ReduxUser = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  imageUrl: "",
};
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    })
    .addCase(updateUser, (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    })
    .addCase(logoutUser, (state) => initialState);
});
