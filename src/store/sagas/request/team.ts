import axios from "axios";

export async function requestGetTeam() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/teams`,
  });
}
