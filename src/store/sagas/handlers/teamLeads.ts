import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setTeamLeads } from "../../reducers/teamLeads";
import { requestGetTeamLeads } from "../request/teamLeads";

export function* handleGetTeamLeads(action: any) {
  try {
    const response: AxiosResponse = yield call(requestGetTeamLeads);
    const { data } = response;
    yield put(setTeamLeads(data?.data));
  } catch (error) {
    console.log(error);
  }
}
