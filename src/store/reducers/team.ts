export const GET_TEAM = "get team";
const SET_TEAM = "set team";
const REMOVE_TEAM = "remove team";

export const getTeam = () => ({
  type: GET_TEAM,
});

export const setTeam = (team: any) => ({
  type: SET_TEAM,
  team,
});

export const removeTeam = () => ({
  type: REMOVE_TEAM,
});

const initialState = {
  team: undefined,
};

export const teamReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TEAM:
      return { ...state, team: [...action.team] };
    case REMOVE_TEAM:
      return { ...state, team: undefined };
    default:
      return state;
  }
};
