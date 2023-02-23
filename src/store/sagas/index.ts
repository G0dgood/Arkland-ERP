import { all, takeLatest } from "redux-saga/effects";
import { GET_DEPARTMENT } from "../reducers/department";
import { GET_EMPLOYEES } from "../reducers/employees";
import { GET_ROLES } from "../reducers/roles";
import { GET_TEAM } from "../reducers/team";
import { GET_TEAM_LEADS } from "../reducers/teamLeads";
import { handleGetDepartments } from "./handlers/department";
import { handleGetEmployees } from "./handlers/employees";
import { handleGetRoles } from "./handlers/roles";
import { handleGetTeam } from "./handlers/team";
import { handleGetTeamLeads } from "./handlers/teamLeads";

export function* saga() {
  yield all([
    takeLatest(GET_DEPARTMENT, handleGetDepartments),
    takeLatest(GET_ROLES, handleGetRoles),
    takeLatest(GET_EMPLOYEES, handleGetEmployees),
    takeLatest(GET_TEAM, handleGetTeam),
    takeLatest(GET_TEAM_LEADS, handleGetTeamLeads),
  ]);
}
