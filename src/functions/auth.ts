import { sessionExpired } from "../utils/sessionExpires";
import { removeData } from "../AppRoutes";

export function handleUnauthorizedError() {
  sessionExpired().then(() => {
    removeData();
    window.location.replace("/");
    window.location.reload();
  });
}
