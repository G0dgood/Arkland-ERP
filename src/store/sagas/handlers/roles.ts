import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setRoles } from "../../reducers/roles";
import { requestGetRoles } from "../request/roles";

export function* handleGetRoles(action: any) {
  try {
    const response: AxiosResponse = yield call(requestGetRoles);
    const { data } = response;
    yield put(setRoles(data.data));
  } catch (error) {
    console.log(error);
  }
}
