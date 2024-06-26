/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from "@reduxjs/toolkit";

import {
  clearCart,
  removeCart,
  setCart,
  increase,
  decrease,
  calculateTotals,
} from "./action";

export const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(clearCart, (state => initialState));
  builder.addCase(removeCart, (state, { action }) => {
    const {payload: id} = action
    state.cartItems = state.cartItems.filter((item) => item.id !== id);
  });
  builder.addCase(increase, (state,  action) => {
    const {payload: id} = action;
    const itemToUpdate = state.cartItems.find(
      (item) => item?.id === id
    );
    if (itemToUpdate) {
      itemToUpdate.amount += 1;
    }
  });
  builder.addCase(decrease, (state, action) => {
    const { payload: id } = action;
    const itemToUpdate = state.cartItems.find((item) => item.id === id);
    if (itemToUpdate && itemToUpdate.amount > 1) {
      itemToUpdate.amount -= 1;
    } else {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    }
  })
  builder.addCase(setCart, (state, { payload }) => {
    const existingItem = state.cartItems.find((item) => item.id === payload.id);
    if (existingItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        }),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...payload, amount: 1 }],
      };
    }
  });
  builder.addCase(calculateTotals, (state, { payload }) => {
    let amount = 0;
    let total = 0;
    state.cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * item.price; // Corrected calculation
    });
    console.log(amount, total);
    return {
      ...state,
      amount: amount,
      total: total,
    };
  });
});
