import { AxiosResponse } from "axios";
import { call, put, delay } from "redux-saga/effects";
import { setProjects } from "../../reducers/project";
import { requestGetProjects } from "../request/project";

export function* handleGetProjects(action: any) {
  let reRun = false;
  let retryCount = 0;
  const maxRetries = 5;
  const retryTimeout = 2000;
  while (retryCount < maxRetries) {
    try {
      const response: AxiosResponse = yield call(requestGetProjects);
      const { data } = response ?? {};
      if (data === undefined) {
        throw new Error("Data not received");
      }
      yield put({ type: "PROJECTS_FETCH_SUCCESS", payload: response });
      yield put(setProjects(data?.data));
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
      type: "PROJECTS_FETCH_ERROR",
      payload: "Failed to fetch teams.",
    });
  }
}
