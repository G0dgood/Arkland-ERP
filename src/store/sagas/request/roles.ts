import axios from "axios";

export function requestGetRoles() {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/employee-roles`,
  });
}
