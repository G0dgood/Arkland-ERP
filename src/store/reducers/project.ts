export const GET_PROJECTS = "get projects";
const SET_PROJECTS = "set projects";
const REMOVE_PROJECTS = "remove projects";

export const getProjects = () => ({
  type: GET_PROJECTS,
});

export const setProjects = (projects: any) => ({
  type: SET_PROJECTS,
  projects,
});

export const removeProjects = () => ({
  type: REMOVE_PROJECTS,
});

const initialState = {
  projects: undefined,
};

export const projectsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PROJECTS:
      return { ...state, projects: [...action.projects] };
    case REMOVE_PROJECTS:
      return { ...state, projects: undefined };
    default:
      return state;
  }
};
