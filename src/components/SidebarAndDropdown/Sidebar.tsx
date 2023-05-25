// import { useState } from 'react';
// import styled from 'styled-components';
// import { Link, useLocation } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
// import SubMenu from './SubMenu';
// import { IconContext } from 'react-icons/lib';

// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarNav: any = styled.nav`
//   background: #fff;
//   width: 250px; 
//   display: flex;
//   justify-content: center;
// 	 /* border-right: 1px solid #e8e8e8; */
// 		// color: #1a1a1a;

//   top: 0;
//   left: ${({ sidebar }: any) => (sidebar ? '0' : '-100%')};
//   transition: 350ms;
//   z-index: 10;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// 		margin-top: 50px;
// `;


// // position: fixed;
// const Sidebar = ({ collapseNav }: any) => {
//   const { pathname } = useLocation();

//   const [sidebar, setSidebar] = useState<any>(true);


//   const showSidebar: any = () => setSidebar(!sidebar);




//   return (
//     <>
//       <div id='open-sidenavbar'>
//         <IconContext.Provider value={{ size: '35px' }} >

//           <SidebarNav sidebar={sidebar}>
//             <SidebarWrap>

//               {SidebarData.map((item: any, index) => {
//                 return (
//                   <div style={{ backgroundColor: pathname === item.path ? '#f4b6b6' : 'transparent', }}>
//                     <SubMenu item={item} key={index} index={index} />;
//                   </div>
//                 )
//               })}
//             </SidebarWrap>
//           </SidebarNav>
//         </IconContext.Provider>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

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

 const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();
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
     <MenuItem className='Side__Content' active={pathname === '/home'} icon={<TfiLayoutGrid2 size={20} />} suffix={<span className="badge red">NEW</span>} >
      Dashboard  <Link to="/home" /> </MenuItem>

     <SubMenu suffix={<span className="badge yellow">3</span>} title={'KPI Assessment'} icon={<FiPieChart size={20} />} >
      <MenuItem className='Side__Content' active={pathname === '/kpicontainer'} icon={<FiPieChart size={20} />}>  My Assessment <Link to="/kpicontainer" /> </MenuItem>
      <MenuItem className='Side__Content' active={pathname === '/kpicontainer/mykpi'}>Team KPI <Link to="/kpicontainer/teamkpi" /> </MenuItem>
      <MenuItem className='Side__Content' active={pathname === '/kpicontainer/allkpireport'}>  <Link to="/kpicontainer/allkpireport" /> All KPI Report</MenuItem>
     </SubMenu>

     <SubMenu suffix={<span className="badge yellow">3</span>} title={'Weekly Report'} icon={<GoFile size={23} />}>
      <MenuItem className='Side__Content' active={pathname === '/weeklycontainer'}>  <Link to="/weeklycontainer" />  Weekly Report</MenuItem>
      <MenuItem className='Side__Content' active={pathname === '/teamweekly'}> <Link to="/teamweekly" />Team Weekly Report</MenuItem>
      {/* <MenuItem className='Side__Content' active={pathname === '/humanresources'}>  <Link to="/humanresources" />Human Resources</MenuItem> */}
     </SubMenu>
     <MenuItem className='Side__Content' active={pathname === '/humanresources'} icon={<CgUserList size={23} />}> Human Resources <Link to="/humanresources" />  </MenuItem>
     <MenuItem className='Side__Content' active={pathname === '/attendance'} icon={<HiOutlineUserGroup size={23} />}> Attendance <Link to="/attendance" /> </MenuItem>
     {(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) && (
      <SubMenu title={'Employees'} icon={<FiUser size={24} />} >
       <MenuItem className='Side__Content' active={pathname === '/employeecontainer'}>  <Link to="/employeecontainer" />  All Employees</MenuItem>
       <MenuItem className='Side__Content' active={pathname === '/warninglist'}> <Link to="/warninglist" /> Warning List</MenuItem>
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
      <MenuItem className='Side__Content' active={pathname === '/teamleaveapplications'}> <Link to="/teamleaveapplications" />Team Leave</MenuItem>
      <MenuItem className='Side__Content' active={pathname === '/allleaveapplications'}>  <Link to="/allleaveapplications" />HR Approve Leave</MenuItem>
     </SubMenu>
     <MenuItem className='Side__Content' active={pathname === '/support'} icon={<BiSupport size={22} />}>  Support <Link to="/support" /> </MenuItem>
     <MenuItem className='Side__Content' active={pathname === '/policy'} icon={<BsShield size={22} />}>  Policy <Link to="/policy" /> </MenuItem>
    </Menu>
   </SidebarContent>
  </ProSidebar>
 );
};

export default Sidebar;
