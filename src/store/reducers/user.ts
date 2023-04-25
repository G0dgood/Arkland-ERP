import { createReducer } from "@reduxjs/toolkit";
import { removeUser, setUser } from "../actions/user";

export interface UserState {
  user: any;
}

const defaultState: UserState = {
  user: {},
};

export const userReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(setUser, (state, action) => {
      state.user = { ...action.payload.user };
    })
    .addCase(removeUser, (state, _action) => {
      state.user = undefined;
    })
);
