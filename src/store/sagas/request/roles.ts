import axios from "axios";

export async function requestGetRoles() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/employee-roles`,
  });
}
