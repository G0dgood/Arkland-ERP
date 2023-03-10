import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import Cookies from "js-cookie";
import store from "./store";
import { store1 } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { handle_logout } from "./utils/auth-util";
import { UserProviderContainer } from "./context/UserContext";

axios.interceptors.request.use(
  function (config: any) {
    const token = Cookies.get("token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      handle_logout();
    }

    return Promise.reject(error || "Something went wrong try again");
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <Provider store={store && store1}> */}
        <HelmetProvider>
          <UserProviderContainer>
            <App />
          </UserProviderContainer>
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
