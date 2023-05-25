import React, { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import "./scss/main.scss";
import "./App.scss";
import Sidebar from "./components/SidebarAndDropdown/Sidebar";
import Header from "./components/Header";
import storage from "./utils/storage";
import LoginRoutes from "./LoginRoutes";

const App: React.FC = (): JSX.Element => {

  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));

  console.log('userInfo', userInfo?.data?.token)

  const [collapseNav, setCollapseNav] = useState(() => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("collapse")) || false;
  });

  useEffect(() => {
    // --- Set state of collapseNav to localStorage on pageLoad --- //
    localStorage.setItem("collapse", JSON.stringify(collapseNav));
    // --- Set state of collapseNav to localStorage on pageLoad --- //
  }, [collapseNav]);
  const toggleSideNav = () => {
    setCollapseNav(!collapseNav);
  }

  return (
    <React.Suspense fallback={"App loading"}>
      {!userInfo?.data?.token || userInfo?.data?.token === undefined ? <LoginRoutes /> : <div id="screen-wrapper">
        <Header toggleSideNav={toggleSideNav} />
        <Sidebar collapseNav={collapseNav} />
        <main>
          <AppRoutes />
        </main>
      </div>}


    </React.Suspense>
  );
};

export default App;
