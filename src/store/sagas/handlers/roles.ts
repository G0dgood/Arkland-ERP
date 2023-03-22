import { AxiosResponse } from "axios";
import { call, put, delay } from "redux-saga/effects";
import { setRoles } from "../../reducers/roles";
import { requestGetRoles } from "../request/roles";

export function* handleGetRoles(action: any) {
  let reRun = false;
  let retryCount = 0;
  const maxRetries = 5;
  const retryTimeout = 2000;

  while (retryCount < maxRetries) {
    try {
      const response: AxiosResponse = yield call(requestGetRoles);
      const { data } = response ?? {};

      if (data === undefined) {
        throw new Error("Data not received");
      }
      yield put({ type: "ROLES_FETCH_SUCCESS", payload: response });
      yield put(setRoles(data?.data));
      return;
    } catch (error) {
      console.log(error);
      retryCount++;
      reRun = true;
      if (retryCount < maxRetries) {
        yield delay(retryTimeout);
      }
    }
    yield put({ type: "ROLES_FETCH_ERROR", payload: "Failed to fetch roles." });
  }
}
