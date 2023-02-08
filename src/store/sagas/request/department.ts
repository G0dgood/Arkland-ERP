import axios from "axios";

export function requestGetDepartments() {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/departments`,
  });
}
