import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { TfiLayoutGrid2 } from 'react-icons/tfi';
import { FiFolder, FiPieChart, FiUser } from 'react-icons/fi';
import { MdOutlineAssessment } from 'react-icons/md';
import { GoFile } from 'react-icons/go';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBriefcase, BsShield } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { getUserPrivileges } from '../../functions/auth';

const { isHRHead, isSuperAdmin, isAdmin, isHrAdmin } = getUserPrivileges();


export const SidebarData = [

	{
		title: 'Dashboard',
		path: '/home',
		icon: <TfiLayoutGrid2 size={20} />,
	},
	{
		title: 'KPI Assessment',
		path: '/kpicontainer',
		icon: <FiPieChart size={20} />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: 'Team KPI',
				path: '/kpicontainer/teamkpi',
				icon: <MdOutlineAssessment size={20} />,
				cName: 'sub-nav'
			},
			{
				title: 'KPI Report',
				path: '/kpicontainer/allkpireport',
				icon: <MdOutlineAssessment size={20} />,
				cName: 'sub-nav'
			},
		]
	},


	{
		title: 'Weekly Report',
		path: '/weeklycontainer',
		icon: <GoFile size={23} />,

		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: 'Team Weekly Report',
				path: '/teamweekly',
				icon: <GoFile size={23} />
			},
		]
	},
	{
		title: 'Human Resources',
		path: '/humanresources',
		icon: <CgUserList size={23} />,

	},
	{
		title: ' Attendance',
		path: '/attendance',
		icon: <HiOutlineUserGroup size={23} />,
	},

	(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) ?
		{
			title: 'All Employees',
			path: '/employeecontainer',
			icon: <FiUser size={24} />,

			iconClosed: <RiIcons.RiArrowDownSFill />,
			iconOpened: <RiIcons.RiArrowUpSFill id='SidebarLabel-container' />,

			subNav: [(isHRHead || isSuperAdmin || isAdmin || isHrAdmin) &&
			{
				title: 'Warning List',
				path: '/warninglist',
				icon: <GoFile size={23} id='SidebarLabel-container' />
			},
			{
				title: 'Terminations',
				path: '/terminations',
				icon: <GoFile size={23} id='SidebarLabel-container' />
			},
			]
		} : "",

	((isHRHead || isSuperAdmin || isAdmin || isHrAdmin) &&
	{
		title: 'HOD',
		path: '/createnewhod',
		icon: <FiUser size={24} />,
	}),

	{
		title: ' Departments',
		path: '/departments',
		icon: <FiFolder size={20} />

	},
	{
		title: ' Projects',
		path: '/projects',
		icon: <AiIcons.AiOutlineBank size={25} />,

	},
	{
		title: 'Leave',
		path: '/leave',
		icon: <BsBriefcase size={22} />,

		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: 'Team Leave',
				path: '/teamleaveapplications',
				icon: <BsBriefcase size={22} />
			},
			{
				title: 'HR Approve Leave',
				path: '/allleaveapplications',
				icon: <BsBriefcase size={22} />
			}
		]
	},
	{
		title: 'Support',
		path: '/support',
		icon: <BiSupport size={22} />
	},
	{
		title: 'Policy',
		path: '/policy',
		icon: <BsShield size={22} />
	}
];
