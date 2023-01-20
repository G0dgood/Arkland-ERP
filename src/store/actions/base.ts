import { createAction } from "@reduxjs/toolkit";
export const startUp = createAction("startUp");
export const resetAndReload = createAction("resetAndReload");
export const reconnectAndLoad = createAction("reconnectAndLoad");

export const setLastServerUnixTimestamp = createAction<number>(
  "setLastServerUnixTimestamp"
);
