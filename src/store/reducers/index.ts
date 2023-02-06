import { combineReducers } from "redux";
// import userReducer from "../actions/user";
import { userReducer, UserState } from "./user";

export interface RootState {
  user: UserState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  user: userReducer,
});
