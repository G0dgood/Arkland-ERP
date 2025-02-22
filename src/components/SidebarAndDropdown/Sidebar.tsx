import { Link, useLocation } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent
} from 'react-pro-sidebar';
import { FaRegAddressCard, FaTasks } from 'react-icons/fa';
import { TfiAnnouncement, TfiLayoutGrid2 } from 'react-icons/tfi';
import { FiFolder, FiPieChart, FiUser, FiUserPlus } from 'react-icons/fi';
import { GoFile } from 'react-icons/go';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineUserGroup } from 'react-icons/hi';
import * as AiIcons from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import { getUserPrivileges } from '../../functions/auth';
import { RiTeamLine } from 'react-icons/ri';
import { GiTeamIdea } from 'react-icons/gi';
import { VscWarning } from 'react-icons/vsc';
import DataService from '../../utils/dataService';
import { useState } from 'react';


const dataService = new DataService()
const Sidebar = ({
  toggled,
  handleToggleSidebar,
  collapseNav
}: any) => {
  const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead, isHeadOfDepartment, isMaster, isSupport, isPayrolladmin } = getUserPrivileges();
  // @ts-ignore
  const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)

  // Retrieve the object from local storage 
  // @ts-ignore
  var isWarning = JSON.parse(localStorage.getItem(userInfo?.employee?.email));

  const { pathname } = useLocation();


  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSubMenuClick = (submenu: any) => {
    if (openDropdown === submenu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(submenu);
    }
  };

  const handleMenuItemClick = (event: any) => {
    // Stop the propagation of the click event to the parent SubMenu
    event.stopPropagation();
  };


  return (
    <ProSidebar
      // image={image ? sidebarBg : false}
      collapsed={collapseNav}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
      // collapsedWidth="4.5rem"
      style={{
        height: '100%',
        overflowY: "scroll",
        top: 'auto',
        // position: 'sticky',
        padding: '0rem',
        margin: '0rem',
        fontSize: "12px"
      }}
    >
      {/* Content */}
      <SidebarContent >
        <Menu iconShape="circle">
          <MenuItem className='Side__Content' active={pathname === '/dashboard'} icon={<TfiLayoutGrid2 size={17} />}   >
            Dashboard  <Link to="/dashboard" /> </MenuItem>
          {/* <MenuItem className='Side__Content' active={pathname === '/application'} icon={<TfiLayoutGrid2 size={17} />}   >
      Application  <Link to="/application" /> </MenuItem> */}

          {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) ? "" : (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/kpiassessment'} icon={<FiPieChart size={17} />}>My Assessment <Link to="/kpiassessment" /> </MenuItem>)}

          {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) && (
            <SubMenu title={'KPI Assessment'} icon={<FiPieChart size={17} />} onClick={() => handleSubMenuClick('dropdown1')}
              open={openDropdown === 'dropdown1'}>
              {(isHRHead || isSuperAdmin || isAdmin) ? "" : (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/kpiassessment'} icon={<FiPieChart size={17} />}>My Assessment <Link to="/kpiassessment" /> </MenuItem>
              )}
              {(isTeamLead || isHeadOfDepartment) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/kpiassessment/kpiassessment/teamkpi'}>Team KPI <Link to="/kpiassessment/kpiassessment/teamkpi" /> </MenuItem>)}

              {(isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/kpiassessment/kpiassessment/admin'}>  <Link to="/kpiassessment/kpiassessment/admin" />All KPI Report</MenuItem>)}
            </SubMenu>)}

          <SubMenu title={'Weekly Report'} icon={<GoFile size={17} />} onClick={() => handleSubMenuClick('dropdown2')}
            open={openDropdown === 'dropdown2'}>
            {(isTeamLead || isHRHead || isAdmin || isHrAdmin || !isSuperAdmin) && (
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/weeklyreport'}>  <Link to="/weeklyreport" />Create Weekly Report</MenuItem>)}
            {(isTeamLead || isHRHead || isAdmin || isHrAdmin || !isSuperAdmin) && (
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === 'weeklyreport/weeklyreport/myweeklyreport'}>  <Link to="weeklyreport/weeklyreport/myweeklyreport" />My Weekly report</MenuItem>)}
            {(isTeamLead || isHeadOfDepartment) && (
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/weeklyreport/weeklyreport/team'}> <Link to="/weeklyreport/weeklyreport/team" />Team Weekly Report</MenuItem>)}
            {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/weeklyreport/weeklyreport/manager'} icon={<TfiAnnouncement size={17} />}>Employee Report<Link to="/weeklyreport/weeklyreport/manager" />  </MenuItem>)}
          </SubMenu>

          {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/announcements'} icon={<TfiAnnouncement size={17} />}>Announcement<Link to="/announcements" />  </MenuItem>)}

          {(isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/attendance/attendance/list/hr'} icon={<CgUserList size={17} />}>
              HR Attendance <Link to="/attendance/attendance/list/hr" />
            </MenuItem>
          )}
          {(isTeamLead || isHRHead || isAdmin || isHrAdmin || !isSuperAdmin) && (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/attendance'} icon={<HiOutlineUserGroup size={17} />}>Attendance <Link to="/attendance" />
            </MenuItem>)}

          {(isHRHead || isSuperAdmin || isHrAdmin || isMaster) && (
            <SubMenu title={'Employees'} icon={<FiUser size={17} />} onClick={() => handleSubMenuClick('dropdown3')}
              open={openDropdown === 'dropdown3'}>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/employees'}>
                <Link to="/employees" />Employees</MenuItem>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/terminations'}>
                <Link to="/terminations" />Terminations</MenuItem>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/hod'}>
                <Link to="/hod" />HOD</MenuItem>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/createnewrole'}>  <Link to="/createnewrole" />Employee Role</MenuItem>
              {(isSuperAdmin || isMaster || isSupport || isAdmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/userprivileges'}>  <Link to="/userprivileges" />User Privileges</MenuItem>)}
            </SubMenu>
          )}
          {/* eslint-disable-next-line no-mixed-operators */}
          {!isSuperAdmin && isWarning > 0 || !isAdmin && isWarning > 0 ? <MenuItem className='Side__Content' active={pathname === '/warning/warning/mywarning'} icon={<VscWarning size={17} />}>My Warnings
            <Link to="/warning/warning/mywarning" />
          </MenuItem> : ""}


          {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
            <SubMenu title={'Warning'} icon={<VscWarning size={17} />} onClick={() => handleSubMenuClick('dropdown4')}
              open={openDropdown === 'dropdown4'}>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/warning'}>
                <Link to="/warning" />Warning List</MenuItem>
            </SubMenu>
          )}

          <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/tasks'} icon={<FaTasks size={17} />}>Tasks
            <Link to="/tasks" />
          </MenuItem>
          {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/departments'} icon={<FiFolder size={17} />}> Departments <Link to="/departments" /> </MenuItem>)}

          {(isTeamLead || isHeadOfDepartment) && (
            <SubMenu title={`${userInfo?.department?.name} Managers  `} icon={<AiIcons.AiOutlineBank size={17} />} onClick={() => handleSubMenuClick('dropdown5')}
              open={openDropdown === 'dropdown5'}>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/teamleadprojects'}>
                <Link to="/teamleadprojects" />Projects</MenuItem>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/teamleadprojects/teamleadprojects/teamleadteams'}
                icon={<RiTeamLine size={17} />}>Team
                <Link to="/teamleadprojects/teamleadprojects/teamleadteams" />
              </MenuItem>
              {/* <MenuItem className='Side__Content' active={pathname === '/teamleadprojects/teamleadprojects/teamLeadterminationlist'}
                icon={<GiTeamIdea size={17} />}>Terminations
                <Link to="/teamleadprojects/teamleadprojects/teamLeadterminationlist" /> </MenuItem> */}
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/attendance/attendance/teamleadattendance'}
                icon={<GiTeamIdea size={17} />}>Team Attendance
                <Link to="/attendance/attendance/teamleadattendance" /> </MenuItem>
            </SubMenu>
          )}
          {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
            <SubMenu title={'Project'} icon={<AiIcons.AiOutlineBank size={17} />} onClick={() => handleSubMenuClick('dropdown6')}
              open={openDropdown === 'dropdown6'}>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/projects'}>
                <Link to="/projects" />Projects</MenuItem>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/team'}
                icon={<RiTeamLine size={17} />}>Team
                <Link to="/team" />
              </MenuItem>
              <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/teamlead'}
                icon={<GiTeamIdea size={17} />}>Project Managers
                <Link to="/teamlead" /> </MenuItem>
            </SubMenu>
          )}

          {(isSupport) && (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/workers_request'} icon={<FiUserPlus size={17} />}> Employee Request <Link to="/workers_request" />  </MenuItem>)}

          {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) ? "" : (
            <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/leave'} icon={<BsBriefcase size={17} />}> Leave <Link to="/leave" />  </MenuItem>)}

          {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) && (
            <SubMenu title={'Leave Management'} icon={<BsBriefcase size={17} />} onClick={() => handleSubMenuClick('dropdown7')}
              open={openDropdown === 'dropdown7'}>

              {(isSuperAdmin || isAdmin || isMaster) ? "" : (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/leave'}>  <Link to="/leave" /> Leave </MenuItem>)}
              {(isTeamLead || isHeadOfDepartment) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/leave/leave/team'}> <Link to="/leave/leave/team" />Team Leave</MenuItem>
              )}
              {(isHRHead || isHrAdmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/leave/leave/hr'}>  <Link to="/leave/leave/hr" />HR Leave</MenuItem>
              )}
              {(isSuperAdmin || isAdmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/leave/leave/admin'}>  <Link to="/leave/leave/admin" />Admin Leave</MenuItem>
              )}
            </SubMenu>)}
          {/* <MenuItem className='Side__Content' active={pathname === '/support'} icon={<BiSupport size={17} />}>  Support <Link to="/support" /> </MenuItem>
          // <MenuItem className='Side__Content' active={pathname === '/policy'} icon={<BsShield size={17} />}>  Policy <Link to="/policy" /> </MenuItem> */}
          {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment || isPayrolladmin) && (
            <SubMenu title={'Pay Roll'} icon={<FaRegAddressCard size={17} />} onClick={() => handleSubMenuClick('dropdown8')}
              open={openDropdown === 'dropdown8'}>
              {(isSuperAdmin || isHRHead || isHrAdmin || isPayrolladmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/payroll/payroll/payrollemployees'}>
                  <Link to="/payroll/payroll/payrollemployees" />Employees</MenuItem>
              )}
              {(isSuperAdmin || isHRHead || isHrAdmin || isPayrolladmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/payroll/payroll/payparameters'}>
                  <Link to="/payroll/payroll/payparameters" />Pay Parameters</MenuItem>
              )}
              {(isSuperAdmin || isTeamLead || isHeadOfDepartment || isPayrolladmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/payroll/payroll/payrun'}> <Link to="/payroll/payroll/payrun" />Pay Run</MenuItem>
              )}
              {(isSuperAdmin || isAdmin || isHRHead || isPayrolladmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/payroll/payroll/approvalrequests'}>  <Link to="/payroll/payroll/approvalrequests" />Approved Requests</MenuItem>
              )}
              {(isSuperAdmin || isAdmin || isHRHead || isPayrolladmin) && (
                <MenuItem onClick={handleMenuItemClick} className='Side__Content' active={pathname === '/payroll/payroll/salaryincrement'}>  <Link to="/payroll/payroll/salaryincrement" />Salary Increment</MenuItem>
              )}
            </SubMenu>)}
        </Menu>
      </SidebarContent>

    </ProSidebar>
  );
};

export default Sidebar;
