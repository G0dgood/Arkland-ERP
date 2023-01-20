import { applyMiddleware, createStore, compose, Action } from "redux";
import { enableMapSet } from "immer";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducer } from "./reducers";
import saga from "./sagas";

enableMapSet();

const LOGOUT = "LOGOUT";
export const logoutUser = () => ({ type: LOGOUT });

const appReducer = (state: any, action: Action) => {
  if (action.type === "LOGOUT") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  appReducer,
  compose(
    applyMiddleware(...middleware),
    typeof window === "object" &&
      typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(saga);

export default store;
