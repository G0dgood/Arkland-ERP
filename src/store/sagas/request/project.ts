import axios from "axios";

export async function requestGetProjects() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/projects`,
  });
}
