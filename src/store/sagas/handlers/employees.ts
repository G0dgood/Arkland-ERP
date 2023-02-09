import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setEmployees } from "../../reducers/employees";
import { requestGetEmployees } from "../request/employees";

export function* handleGetEmployees(action: any) {
  try {
    const response: AxiosResponse = yield call(requestGetEmployees);
    const { data } = response;
    yield put(setEmployees(data?.data));
  } catch (error) {
    console.log(error);
  }
}
