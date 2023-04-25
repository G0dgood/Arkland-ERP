import { AxiosResponse } from "axios";
import { call, put, delay, take } from "redux-saga/effects";
import { setDepartment } from "../../reducers/department";
import { requestGetDepartments } from "../request/department";
import { getProjects } from "../../reducers/project";

export function* handleGetDepartments(action: any) {
  let retryCount = 0;
  const maxRetries = 5;
  const retryTimeout = 2000;

  while (retryCount < maxRetries) {
    try {
      const response: AxiosResponse = yield call(requestGetDepartments);
      const { data } = response ?? {};
      if (data === undefined) {
        throw new Error("Data not received");
      }
      yield put({ type: "DEPARTMENTS_FETCH_SUCCESS", payload: response });
      yield put(setDepartment(data?.data));
      yield put(getProjects());
      return data.data;
    } catch (error) {
      console.log(error);
      retryCount++;
      if (retryCount < maxRetries) {
        yield delay(retryTimeout);
      }
    }
  }
  yield put({
    type: "DEPARTMENTS_FETCH_ERROR",
    payload: "Failed to fetch departments.",
  });
  throw Error("Failed to fetch departments");
}
