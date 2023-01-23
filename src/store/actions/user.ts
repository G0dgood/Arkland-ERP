export const GET_USER = "get user";
const SET_USER = "set user";
const REMOVE_USER = "remove user";

export const getUser = () => ({ type: GET_USER });

export const setUser = (user: any) => ({ type: SET_USER, user });

export const removeUser = () => ({ type: REMOVE_USER });

const initialState = {
  user: undefined,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.user };
    case REMOVE_USER:
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default userReducer;
