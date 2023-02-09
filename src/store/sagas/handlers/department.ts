import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { setDepartment } from "../../reducers/department";
import { requestGetDepartments } from "../request/department";

export function* handleGetDepartments(action: any) {
  try {
    const response: AxiosResponse = yield call(requestGetDepartments);
    const { data } = response;
    yield put(setDepartment(data?.data));
  } catch (error) {
    console.log(error);
  }
}
