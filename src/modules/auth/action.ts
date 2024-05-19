import { createAction } from "@reduxjs/toolkit";
import { UserAuth } from "./type";

export const setAuth = createAction<UserAuth>("auth/SET_AUTH");
