import { AxiosResponse } from "axios";
import { call, put, delay } from "redux-saga/effects";
import { setTeamLeads } from "../../reducers/teamLeads";
import { requestGetTeamLeads } from "../request/teamLeads";

export function* handleGetTeamLeads(action: any) {
  // let reRun = false;
  let retryCount = 0;
  const maxRetries = 5;
  const retryTimeout = 2000;

  while (retryCount < maxRetries) {
    try {
      const response: AxiosResponse = yield call(requestGetTeamLeads);
      const { data } = response ?? {};
      if (data === undefined) {
        throw new Error("Data not received");
      }
      yield put({ type: "TEAMLEADS_FETCH_SUCCESS", payload: response });
      yield put(setTeamLeads(data?.data));
      return;
    } catch (error) {
      console.log(error);
      retryCount++;
      // reRun = true;
      if (retryCount < maxRetries) {
        yield delay(retryTimeout);
      }
    }
  }
  yield put({
    type: "TEAMLEADS_FETCH_ERROR",
    payload: "Failed to fetch team leads.",
  });
  throw Error("Failed to fetch team leads");
}
