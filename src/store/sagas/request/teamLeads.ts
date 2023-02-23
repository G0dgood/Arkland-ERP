import axios from "axios";

export async function requestGetTeamLeads() {
  return await axios.request({
    method: "get",
    url: `${process.env.REACT_APP_API}/hr/team-leads`,
  });
}
