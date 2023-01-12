import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi';
import EditProfile from './components/EditProfile';
import EditEducation from './components/EditEducation';
import EditNextKin from './components/EditNextKin';
import ResetPassword from './components/ResetPassword';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Button } from '@material-ui/core';

const EditUser = () => {

  const [activeTab, setActiveTab] = useState(0)

  const tabs = ["Profile", "Education", "Next of Kin", "Reset Password"]
  const tabPanels = [
    { component: <EditProfile /> },
    { component: <EditEducation /> },
    { component: <EditNextKin /> },
    { component: <ResetPassword /> }
  ]

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
  };


  return (
    <div id="screen-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <Sidebar collapseNav={collapseNav} />
      <main id="edit-user">
        <h6 className="page-title"><Link to="/profile">Profile</Link> | Edit Profile</h6>
        <section>
          <div className="user-info">
            <BiUser size={80} />
            <div className="user-detail">
              <h3>Bito Unlimited</h3>
              <p>bito.unlimited@alc.com</p>
              <p>Frontend Developer</p>
            </div>
          </div>
          <div className="profile-container">
            <ul className="nav-tabs">
              {tabs.map((item, i) =>
                <Button variant="outlined" key={i} className={activeTab === i ? "Add-btn-edit" : "show-btn-edit"} onClick={() => setActiveTab(i)}>{item}</Button>
              )}
            </ul>
            {tabPanels[activeTab].component}
          </div>
        </section>
      </main>
    </div>
  )
};
// contained
export default EditUser;