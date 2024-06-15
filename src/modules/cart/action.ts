import { createAction } from "@reduxjs/toolkit";

export const setCart = createAction("cart/SET_CART");
export const updateCart = createAction("cart/UPDATE_CART");
export const removeCart = createAction("cart/REMOVE_CART");
export const clearCart = createAction("cart/CLEAR_CART");
export const increase = createAction("cart/INCREASE");
export const decrease = createAction("cart/DECREASE");
export const calculateTotals = createAction("cart/CALCULATE_TOTALS")
