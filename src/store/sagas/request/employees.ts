import axios from "axios";

export function requestGetEmployees() {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/employees?status=in+review`,
  });
}
