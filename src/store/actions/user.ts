import { createAction } from "@reduxjs/toolkit";
import { create } from "domain";

export const GET_USER = "get user";
const SET_USER = "set user";
const REMOVE_USER = "remove user";

// export const getUser = () => ({ type: GET_USER });

export const getUser = createAction<{
  user: {};
}>("getUser");

export const setUser = createAction<{ user: {} }>("setUser");

export const removeUser = createAction<{ user: {} }>("removeUser");

// export const setUser = (user: any) => ({ type: SET_USER, user });

// export const removeUser = () => ({ type: REMOVE_USER });

const initialState = {
  user: undefined,
};

// const userReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case SET_USER:
//       return { ...state, ...action.user };
//     case REMOVE_USER:
//       return { ...state, user: undefined };
//     default:
//       return state;
//   }
// };

// export default userReducer;
