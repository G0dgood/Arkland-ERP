import { Link, useLocation } from 'react-router-dom';
import {
 ProSidebar,
 Menu,
 MenuItem,
 SubMenu,
 SidebarContent
} from 'react-pro-sidebar';
import { FaTasks } from 'react-icons/fa';
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



const Sidebar = ({
 toggled,
 handleToggleSidebar,
 collapseNav
}: any) => {

 const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead, isHeadOfDepartment, isMaster } = getUserPrivileges();

 console.log('isTeamLead', isTeamLead)
 const { pathname } = useLocation();
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
   <SidebarContent>
    <Menu iconShape="circle">
     <MenuItem className='Side__Content' active={pathname === '/'} icon={<TfiLayoutGrid2 size={20} />} suffix={<span className="badge red">NEW</span>} >
      Dashboard  <Link to="/" /> </MenuItem>
     {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) ? "" : (
      <MenuItem className='Side__Content' active={pathname === '/kpiassessment'} icon={<FiPieChart size={20} />}>My Assessment <Link to="/kpiassessment" /> </MenuItem>)}

     {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) && (
      <SubMenu suffix={<span className="badge yellow">3</span>} title={'KPI Assessment'} icon={<FiPieChart size={20} />} >
       {(isTeamLead || isHRHead || isSuperAdmin || isAdmin) ? "" : (
        <MenuItem className='Side__Content' active={pathname === '/kpiassessment'} icon={<FiPieChart size={20} />}>My Assessment <Link to="/kpiassessment" /> </MenuItem>
       )}
       {(isTeamLead || isHeadOfDepartment) && (
        <MenuItem className='Side__Content' active={pathname === '/kpiassessment/kpiassessment/teamkpi'}>Team KPI <Link to="/kpiassessment/kpiassessment/teamkpi" /> </MenuItem>)}

       {(isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
        <MenuItem className='Side__Content' active={pathname === '/kpiassessment/kpiassessment/admin'}>  <Link to="/kpiassessment/kpiassessment/admin" /> All KPI Report</MenuItem>)}
      </SubMenu>)}

     <SubMenu suffix={<span className="badge yellow">3</span>} title={'Weekly Report'} icon={<GoFile size={23} />}>
      {(isTeamLead || isHRHead || isAdmin || isHrAdmin || !isSuperAdmin) && (
       <MenuItem className='Side__Content' active={pathname === '/weeklyreport'}>  <Link to="/weeklyreport" />Create Weekly Report</MenuItem>)}
      {(isTeamLead || isHRHead || isAdmin || isHrAdmin || !isSuperAdmin) && (
       <MenuItem className='Side__Content' active={pathname === 'weeklyreport/weeklyreport/myweeklyreport'}>  <Link to="weeklyreport/weeklyreport/myweeklyreport" />My Weekly report</MenuItem>)}
      {(isTeamLead || isHeadOfDepartment) && (
       <MenuItem className='Side__Content' active={pathname === '/weeklyreport/weeklyreport/team'}> <Link to="/weeklyreport/weeklyreport/team" />Team Weekly Report</MenuItem>)}
      {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
       <MenuItem className='Side__Content' active={pathname === '/weeklyreport/weeklyreport/manager'} icon={<TfiAnnouncement size={23} />}> Employee Report<Link to="/weeklyreport/weeklyreport/manager" />  </MenuItem>)}
     </SubMenu>

     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <MenuItem className='Side__Content' active={pathname === '/announcements'} icon={<TfiAnnouncement size={23} />}> Announcement<Link to="/announcements" />  </MenuItem>)}

     {(isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <MenuItem className='Side__Content' active={pathname === '/attendance/attendance/list/hr'} icon={<CgUserList size={23} />}>
       HR Attendance <Link to="/attendance/attendance/list/hr" />
      </MenuItem>
     )}
     {(isTeamLead || isHRHead || isAdmin || isHrAdmin || !isSuperAdmin) && (
      <MenuItem className='Side__Content' active={pathname === '/attendance'} icon={<HiOutlineUserGroup size={23} />}> Attendance <Link to="/attendance" /> </MenuItem>)}

     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <SubMenu title={'Employees'} icon={<FiUser size={24} />} >
       <MenuItem className='Side__Content' active={pathname === '/employees'}>  <Link to="/employees" />Employees</MenuItem>

       <MenuItem className='Side__Content' active={pathname === '/terminations'}>  <Link to="/terminations" />Terminations</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/hod'}>  <Link to="/hod" />HOD</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/createnewrole'}>  <Link to="/createnewrole" />Employee Role</MenuItem>
       {(isSuperAdmin || isMaster) && (
        <MenuItem className='Side__Content' active={pathname === '/userprivileges'}>  <Link to="/userprivileges" />User Privileges</MenuItem>)}
      </SubMenu>
     )}

     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <SubMenu title={'Warning'} icon={<VscWarning size={24} />} >
       <MenuItem className='Side__Content' active={pathname === '/warning'}>
        <Link to="/warning" />Warning List</MenuItem>
      </SubMenu>
     )}

     <MenuItem className='Side__Content' active={pathname === '/tasks'} icon={<FaTasks size={20} />}>Tasks
      <Link to="/tasks" />
     </MenuItem>
     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <MenuItem className='Side__Content' active={pathname === '/team'} icon={<RiTeamLine size={20} />}>Team
       <Link to="/team" />
      </MenuItem>)}
     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <MenuItem className='Side__Content' active={pathname === '/teamlead'} icon={<GiTeamIdea size={20} />}>Team Lead
       <Link to="/teamlead" /> </MenuItem>)}
     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster) && (
      <MenuItem className='Side__Content' active={pathname === '/departments'} icon={<FiFolder size={20} />}> Departments <Link to="/departments" /> </MenuItem>)}
     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
      <MenuItem className='Side__Content' active={pathname === '/projects'} icon={<AiIcons.AiOutlineBank size={25} />}> Projects <Link to="/projects" />  </MenuItem>)}
     {(isHRHead || isHrAdmin) && (
      <MenuItem className='Side__Content' active={pathname === '/workers_request'} icon={<FiUserPlus size={25} />}> Workers Request <Link to="/workers_request" />  </MenuItem>)}

     {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) ? "" : (
      <MenuItem className='Side__Content' active={pathname === '/leave'} icon={<BsBriefcase size={25} />}> Leave <Link to="/leave" />  </MenuItem>)}

     {(isTeamLead || isHRHead || isSuperAdmin || isAdmin || isHrAdmin || isMaster || isHeadOfDepartment) && (
      <SubMenu title={'Leave Management'} icon={<BsBriefcase size={22} />}>

       {(isSuperAdmin || isAdmin || isHrAdmin || isMaster) ? "" : (
        <MenuItem className='Side__Content' active={pathname === '/leave'}>  <Link to="/leave" /> Leave </MenuItem>)}
       {(isTeamLead || isHeadOfDepartment) && (
        <MenuItem className='Side__Content' active={pathname === '/leave/leave/team'}> <Link to="/leave/leave/team" />Team Leave</MenuItem>
       )}
       {(isHRHead || isHrAdmin) && (
        <MenuItem className='Side__Content' active={pathname === '/leave/leave/hr'}>  <Link to="/leave/leave/hr" />HR Leave</MenuItem>
       )}
       {(isSuperAdmin || isAdmin) && (
        <MenuItem className='Side__Content' active={pathname === '/leave/leave/admin'}>  <Link to="/leave/leave/admin" />Admin Leave</MenuItem>
       )}
      </SubMenu>)}
     {/* <MenuItem className='Side__Content' active={pathname === '/support'} icon={<BiSupport size={22} />}>  Support <Link to="/support" /> </MenuItem>
          // <MenuItem className='Side__Content' active={pathname === '/policy'} icon={<BsShield size={22} />}>  Policy <Link to="/policy" /> </MenuItem> */}

    </Menu>
   </SidebarContent>

  </ProSidebar>
 );
};

export default Sidebar;
