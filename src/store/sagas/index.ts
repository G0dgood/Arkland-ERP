import { all, takeLatest } from "redux-saga/effects";
import { GET_DEPARTMENT } from "../reducers/department";
import { GET_ROLES } from "../reducers/roles";
import { handleGetDepartments } from "./handlers/department";
import { handleGetRoles } from "./handlers/roles";

export function* saga() {
  yield all([
    takeLatest(GET_DEPARTMENT, handleGetDepartments),
    takeLatest(GET_ROLES, handleGetRoles),
  ]);
}
