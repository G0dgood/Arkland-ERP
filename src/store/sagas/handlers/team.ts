import { AxiosResponse } from "axios";
import { call, put, delay } from "redux-saga/effects";
import { setTeam } from "../../reducers/team";
import { requestGetTeam } from "../request/team";

export function* handleGetTeam(action: any) {
  let reRun = false;
  let retryCount = 0;
  const maxRetries = 3;
  const retryTimeout = 2000;
  while (retryCount < maxRetries) {
    try {
      const response: AxiosResponse = yield call(requestGetTeam);
      const { data } = response ?? {};
      if (data === undefined) {
        throw new Error("Data not received");
      }
      yield put({ type: "TEAMS_FETCH_SUCCESS", payload: response });
      yield put(setTeam(data?.data));
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
      type: "TEAMS_FETCH_ERROR",
      payload: "Failed to fetch teams.",
    });
  }
}
