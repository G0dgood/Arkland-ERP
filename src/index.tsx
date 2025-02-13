import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./components/SocketContext";
import "react-toastify/dist/ReactToastify.css";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </HelmetProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
