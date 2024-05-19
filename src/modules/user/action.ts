import { createAction } from "@reduxjs/toolkit";
import { ReduxUser, UserUpdatePayload } from "./type";

export const setUser = createAction<ReduxUser>("user/SET_USER");
export const updateUser = createAction<UserUpdatePayload>("user/UPDATE_USER");
export const logoutUser = createAction<void>("user/LOGOUT_USER");
