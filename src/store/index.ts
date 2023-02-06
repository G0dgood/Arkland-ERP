import { applyMiddleware, createStore, compose, Action } from "redux";
import { enableMapSet } from "immer";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducer } from "./reducers";
import saga from "./sagas";
import { startUp } from "./actions/base";
import { log } from "../functions/base";

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
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   appReducer,
//   compose(
//     applyMiddleware(...middleware),
//     typeof window === "object" &&
//       typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
//       ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//       : (f: any) => f
//   )
// );
const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(saga);
store.dispatch(startUp());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    const nextRootReducer = require("./reducers").rootReducer;
    log("nextRootReducer", nextRootReducer);
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
