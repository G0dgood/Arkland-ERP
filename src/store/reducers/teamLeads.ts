export const GET_TEAM_LEADS = "get team leads";
const SET_TEAM_LEADS = "set team leads";
const REMOVE_TEAM_LEADS = "remove team leads";

export const getTeamLeads = () => ({
  type: GET_TEAM_LEADS,
});

export const setTeamLeads = (teamLeads: any) => ({
  type: SET_TEAM_LEADS,
  teamLeads,
});

export const removeTeamLeads = () => ({
  type: REMOVE_TEAM_LEADS,
});

const initialState = {
  teamLeads: undefined,
};

export const teamLeadsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TEAM_LEADS:
      return { ...state, teamLeads: [...action.teamLeads] };
    case REMOVE_TEAM_LEADS:
      return { ...state, teamLeads: undefined };
    default:
      return state;
  }
};
