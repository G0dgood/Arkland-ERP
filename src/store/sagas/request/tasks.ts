import axios from "axios";

export async function requestGetTasks() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/tasks`,
  });
}
