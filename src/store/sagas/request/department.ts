import axios from "axios";

export async function requestGetDepartments() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/departments`,
  });
}
