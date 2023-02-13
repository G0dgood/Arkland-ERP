import axios from "axios";

export async function requestGetEmployees() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/employees?status=in+review`,
  });
}
