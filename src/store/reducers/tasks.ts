export const GET_TASKS = "get tasks";
const SET_TASKS = "set tasks";
const REMOVE_TASKS = "remove tasks";

export const getTasks = () => ({
  type: GET_TASKS,
});

export const setTasks = (tasks: any) => ({
  type: SET_TASKS,
  tasks,
});

export const removeTasks = () => ({
  type: REMOVE_TASKS,
});

const initialState = {
  tasks: undefined,
};

export const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: [...action.tasks] };
    case REMOVE_TASKS:
      return { ...state, tasks: undefined };
    default:
      return state;
  }
};
