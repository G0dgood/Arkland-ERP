import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./scss/main.scss";
import "./App.scss";

const App: React.FC = (): JSX.Element => {
  return (
    <React.Suspense fallback={"App loading"}>
      <AppRoutes />
    </React.Suspense>
  );
};

export default App;
