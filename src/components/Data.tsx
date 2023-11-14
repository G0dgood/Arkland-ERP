
import { GiAlarmClock, GiStahlhelm } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { AiOutlineException } from "react-icons/ai";
import { FaRegMoneyBillAlt, FaUserPlus } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { BsCalendar2Month, BsChatText, BsFillBriefcaseFill } from "react-icons/bs";
import { GrStatusWarning, GrUserWorker } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";


export const states = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
];


export const iconMap: any = {
	"new employee": <FaUserPlus size={20} />,
	"new HOD": <FaUserPlus size={20} />,
	"employee approval": <FaUserPlus size={20} />,
	"employment termination": <FaUserPlus size={20} />,
	"termination approval": <FaUserPlus size={20} />,
	"leave HR approval": <BsFillBriefcaseFill size={20} />,
	"leave application": <BsFillBriefcaseFill size={20} />,
	"leave approval": <BsFillBriefcaseFill size={20} />,
	"leave rejection": <BsFillBriefcaseFill size={20} />,
	"leave HOD approval": <BsFillBriefcaseFill size={20} />,
	"announcement": <HiSpeakerphone size={20} />,
	"workers request application": <GrUserWorker size={20} />,
	"workers request approval": <GrUserWorker size={20} />,
	"workers request rejection": <GrUserWorker size={20} />,
	"assisted clock in": <GiAlarmClock size={20} />,
	"new warning": <GrStatusWarning size={20} />,
	"warning response": <GrStatusWarning size={20} />,
	"warning decision": <GrStatusWarning size={20} />,
	"project creation": <GiStahlhelm size={20} />,
	"project commencement": <GiStahlhelm size={20} />,
	"project completion": <GiStahlhelm size={20} />,
	"new chat": <BsChatText size={20} />,
	"team assignment": <RiTeamLine size={20} />,
	"team removal": <RiTeamLine size={20} />,
	"task assignment": <BiTask size={20} />,
	"role assignment": <MdOutlineAssignmentInd size={20} />,
	"appraisal request": <AiOutlineException size={20} />,
	"appraisal response": <AiOutlineException size={20} />,
	"salary increment": <FaRegMoneyBillAlt size={20} />,
	"annual salary increment": <FaRegMoneyBillAlt size={20} />,
	"salary decrement": <FaRegMoneyBillAlt size={20} />,
	"new event": <BsCalendar2Month size={20} />,
};