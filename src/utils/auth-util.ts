import storage from "./storage";

export const handle_logout = () => {
  storage.clear();
  window.location.reload();
  window.location.replace("/");
};

export const checkRole = (roles: string[] = []) => {
  let role = "";
  if (roles.length > 0 && roles.includes("admin")) {
    role = "admin";
  }

  if (roles.length > 0 && roles.includes("agent")) {
    role = "agent";
  }

  return role;
};

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
