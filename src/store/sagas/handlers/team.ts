import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setTeam } from "../../reducers/team";
import { requestGetTeam } from "../request/team";

export function* handleGetTeam(action: any) {
  try {
    const response: AxiosResponse = yield call(requestGetTeam);
    const { data } = response;
    console.log(data);
    yield put(setTeam(data?.data));
  } catch (error) {
    console.log(error);
  }
}
