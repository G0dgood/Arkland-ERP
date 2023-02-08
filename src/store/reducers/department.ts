export const GET_DEPARTMENT = "get department";
const SET_DEPARTMENT = "set department";
const REMOVE_DEPARTMENT = "remove department";

export const getDepartment = () => ({
  type: GET_DEPARTMENT,
});

export const setDepartment = (department: any) => ({
  type: SET_DEPARTMENT,
  department,
});

export const removeDepartment = () => ({
  type: REMOVE_DEPARTMENT,
});

const initialState = {
  department: undefined,
};

export const departmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DEPARTMENT:
      return { ...state, department: [...action.department] };
    case REMOVE_DEPARTMENT:
      return { ...state, department: undefined };
    default:
      return state;
  }
};
