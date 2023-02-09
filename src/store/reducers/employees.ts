export const GET_EMPLOYEES = "get employees";
const SET_EMPLOYEES = "set employees";
const REMOVE_EMPLOYEES = "remove employees";

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
});

export const setEmployees = (employees: any) => ({
  type: SET_EMPLOYEES,
  employees,
});

export const removeEmployees = () => ({
  type: REMOVE_EMPLOYEES,
});

const initialState = {
  employees: [],
};

export const EmployeesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return { ...state, employees: [...action.employees] };
    case REMOVE_EMPLOYEES:
      return { ...state, employees: undefined };
    default:
      return state;
  }
};
