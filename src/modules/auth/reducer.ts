import { createReducer } from "@reduxjs/toolkit";

import { setAuth } from "./action";
import { UserAuth } from "./type";

export const initialState: UserAuth = {
  access_token: "",
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuth, (state, { payload }) => {
    return {
      ...state,
      ...payload,
    };
  });
});
