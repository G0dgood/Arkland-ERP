import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getRequestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
};
