export const GET_ROLES = "get roles";
const SET_ROLES = "set roles";
const REMOVE_ROLES = "remove roles";

export const getRoles = () => ({
  type: GET_ROLES,
});

export const setRoles = (roles: any) => ({
  type: SET_ROLES,
  roles,
});

export const removeRoles = () => ({
  type: REMOVE_ROLES,
});

const initialState = {
  roles: undefined,
};

export const rolesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ROLES:
      return { ...state, roles: [...action.roles] };
    case REMOVE_ROLES:
      return { ...state, roles: undefined };
    default:
      return state;
  }
};
