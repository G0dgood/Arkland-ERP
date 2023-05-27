import React, { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import "./scss/main.scss";
import "./App.scss";
import Sidebar from "./components/SidebarAndDropdown/Sidebar";
import Header from "./components/Header";
import storage from "./utils/dataService";
import LoginRoutes from "./LoginRoutes";
import LogoutOption from "./components/LogoutOption";

const App: React.FC = (): JSX.Element => {

  // @ts-ignore
  const userInfo: any = JSON.parse(storage?.get("user"));
  console.log('userInfo', userInfo?.data?.token)
  const [showLogout, setShowLogout] = useState<any>(false);
  // const [handleLogout, setHandleLogout] = useState<any>(false);
  const [isLoading1, setisLoading1] = useState<any>(false);


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
      {!userInfo?.data?.token || userInfo?.data?.token === undefined ? <LoginRoutes /> :
        <div id="screen-wrapper">
          <Header toggleSideNav={toggleSideNav} setShowLogout={setShowLogout} />
          <Sidebar collapseNav={collapseNav} showLogout={showLogout} />
          <main>
            <LogoutOption
              setShowLogout={setShowLogout}
              showLogout={showLogout}
            // handleLogout={handleLogout}
            // isLoading1={isLoading1}
            />
            <AppRoutes setShowLogout={setShowLogout}
              showLogout={showLogout} />
          </main>
        </div>}


    </React.Suspense>
  );
};

export default App;
