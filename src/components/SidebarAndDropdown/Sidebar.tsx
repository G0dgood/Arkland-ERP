import { Link, useLocation } from 'react-router-dom';
import {
 ProSidebar,
 Menu,
 MenuItem,
 SubMenu,
 SidebarContent
} from 'react-pro-sidebar';
import {
 FaList,
} from 'react-icons/fa';
import { TfiLayoutGrid2 } from 'react-icons/tfi';
import { FiFolder, FiPieChart, FiUser } from 'react-icons/fi';
import { GoFile } from 'react-icons/go';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineUserGroup } from 'react-icons/hi';
import * as AiIcons from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { BsBriefcase, BsShield } from 'react-icons/bs';
import { getUserPrivileges } from '../../functions/auth';



const Sidebar = ({
 toggled,
 handleToggleSidebar,
 collapseNav
}: any) => {

 const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin, isTeamLead } = getUserPrivileges();


 const { pathname } = useLocation();
 return (
  <ProSidebar
   // image={image ? sidebarBg : false}
   collapsed={collapseNav}
   toggled={toggled}
   onToggle={handleToggleSidebar}
   breakPoint="md"
  >

   {/* Content */}
   <SidebarContent>
    <Menu iconShape="circle">
     <MenuItem className='Side__Content' active={pathname === '/'} icon={<TfiLayoutGrid2 size={20} />} suffix={<span className="badge red">NEW</span>} >
      Dashboard  <Link to="/" /> </MenuItem>

     <SubMenu suffix={<span className="badge yellow">3</span>} title={'KPI Assessment'} icon={<FiPieChart size={20} />} >
      <MenuItem className='Side__Content' active={pathname === '/kpiassessment'} icon={<FiPieChart size={20} />}>  My Assessment <Link to="/kpiassessment" /> </MenuItem>
      {(isTeamLead) && (
       <MenuItem className='Side__Content' active={pathname === '/kpiassessment/kpiassessment/teamkpi'}>Team KPI <Link to="/kpiassessment/kpiassessment/teamkpi" /> </MenuItem>
      )}
      <MenuItem className='Side__Content' active={pathname === '/kpiassessment/kpiassessment/admin'}>  <Link to="/kpiassessment/kpiassessment/admin" /> All KPI Report</MenuItem>
     </SubMenu>

     <SubMenu suffix={<span className="badge yellow">3</span>} title={'Weekly Report'} icon={<GoFile size={23} />}>
      <MenuItem className='Side__Content' active={pathname === '/weeklyreport'}>  <Link to="/weeklyreport" />Create Weekly Report</MenuItem>
      <MenuItem className='Side__Content' active={pathname === 'weeklyreport/weeklyreport/myweeklyreport'}>  <Link to="weeklyreport/weeklyreport/myweeklyreport" />My Weekly report</MenuItem>
      <MenuItem className='Side__Content' active={pathname === '/weeklyreport/weeklyreport/team'}> <Link to="/weeklyreport/weeklyreport/team" />Team Weekly Report</MenuItem>
     </SubMenu>
     <MenuItem className='Side__Content' active={pathname === '/attendance/attendance/list/hr'} icon={<CgUserList size={23} />}> Human Resources <Link to="/attendance/attendance/list/hr" />  </MenuItem>
     <MenuItem className='Side__Content' active={pathname === '/attendance'} icon={<HiOutlineUserGroup size={23} />}> Attendance <Link to="/attendance" /> </MenuItem>

     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
      <SubMenu title={'Employees'} icon={<FiUser size={24} />} >
       <MenuItem className='Side__Content' active={pathname === '/employees'}>  <Link to="/employees" />Employees</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/warning'}> <Link to="/warning" /> Warning List</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/terminations'}>  <Link to="/terminations" />Terminations</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/createnewhod'}>  <Link to="/createnewhod" />HOD</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/createnewrole'}>  <Link to="/createnewrole" />Create Role</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/userprivileges'}>  <Link to="/userprivileges" />User Privileges</MenuItem>
      </SubMenu>
     )}

     <MenuItem className='Side__Content' active={pathname === '/departments'} icon={<FiFolder size={20} />}> Departments <Link to="/departments" /> </MenuItem>
     <MenuItem className='Side__Content' active={pathname === '/projects'} icon={<AiIcons.AiOutlineBank size={25} />}> Projects <Link to="/projects" />  </MenuItem>
     <SubMenu title={'Leave Management'} icon={<BsBriefcase size={22} />}>
      <MenuItem className='Side__Content' active={pathname === '/leave'}>  <Link to="/leave" /> Leave </MenuItem>
      {/* {(isTeamLead) && ( */}
      <MenuItem className='Side__Content' active={pathname === '/leave/leave/team'}> <Link to="/leave/leave/team" />Team Leave</MenuItem>
      {/* )} */}
      {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
       <MenuItem className='Side__Content' active={pathname === '/allleaveapplications'}>  <Link to="/allleaveapplications" />HR Leave</MenuItem>
      )}
      {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
       <MenuItem className='Side__Content' active={pathname === '/allleaveapplications'}>  <Link to="/allleaveapplications" />Admin Leave</MenuItem>
      )}
     </SubMenu>
     <MenuItem className='Side__Content' active={pathname === '/support'} icon={<BiSupport size={22} />}>  Support <Link to="/support" /> </MenuItem>
     <MenuItem className='Side__Content' active={pathname === '/policy'} icon={<BsShield size={22} />}>  Policy <Link to="/policy" /> </MenuItem>
    </Menu>
   </SidebarContent>

  </ProSidebar>
 );
};

export default Sidebar;
