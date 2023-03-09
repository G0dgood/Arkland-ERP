import { combineReducers } from "redux";
import { departmentReducer } from "./department";
import { EmployeesReducer } from "./employees";
import { rolesReducer } from "./roles";
import { teamReducer } from "./team";
import { teamLeadsReducer } from "./teamLeads";
import { userReducer, UserState } from "./user"; 


export interface RootState {
  user: UserState;
  department: any;
  roles: any;
  employees: any;
  team: any;
  teamLeads: any; 
}

export const rootReducer = combineReducers<RootState | undefined>({
  user: userReducer,
  department: departmentReducer,
  roles: rolesReducer,
  employees: EmployeesReducer,
  team: teamReducer,
  teamLeads: teamLeadsReducer, 
});
