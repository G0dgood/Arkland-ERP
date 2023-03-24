import { AxiosResponse } from "axios";
import { call, put, delay } from "redux-saga/effects";
import { setTasks } from "../../reducers/tasks";
import { requestGetTasks } from "../request/tasks";

export function* handleGetTasks(action: any) {
  let reRun = false;
  let retryCount = 0;
  const maxRetries = 3;
  const retryTimeout = 2000;

  while (retryCount < maxRetries) {
    try {
      const response: AxiosResponse = yield call(requestGetTasks);
      const { data } = response ?? {};
      if (data === undefined) {
        throw new Error("Data not received");
      }
      yield put({ type: "TASKS_FETCH_SUCCESS", payload: response });
      yield put(setTasks(data?.data));
      return;
    } catch (error) {
      console.log(error);
      retryCount++;
      reRun = true;
      if (retryCount < maxRetries) {
        yield delay(retryTimeout);
      }
    }
    yield put({
      type: "TASKS_FETCH_ERROR",
      payload: "Failed to fetch tasks.",
    });
  }
}
