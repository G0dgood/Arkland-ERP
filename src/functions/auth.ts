 import DataService from "../utils/dataService";
 

const dataService =  new DataService();

export interface User {
  data: {
    privileges: Privilege[];
  };
}

export interface Privilege {
  role: string;
}

export function getUserPrivileges(): {
  isHRHead: boolean;
  isHeadOfDepartment: boolean;
  isTeamLead: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  isHrAdmin: boolean;
  isMaster: boolean;
  isSupport: boolean;
} {

   
  const userString =  dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`) 
  const userInfo = userString ? userString : null;
  const privileges = userInfo?.privileges || [];

   
  

  const isSuperAdmin = privileges.some((p: any) => p.role === "super admin");
  const isAdmin = privileges.some((p: any) => p.role === "admin");
  const isTeamLead = privileges.some((p: any) => p.role === "team lead");
  const isEmployee = privileges.some((p: any) => p.role === "employee");
  const isHeadOfDepartment = privileges.some( (p: any) => p.role === "head of department" );
  const isHRHead = privileges.some((p: any) => p.role === "HR head");
  const isHrAdmin = privileges.some((p: any) => p.role === "HR admin");
  const isMaster = privileges.some((p: any) => p.role === "master");
  const isSupport = privileges.some((p: any) => p.role === "support");
   

  return {
    isHRHead,
    isHeadOfDepartment,
    isTeamLead,
    isSuperAdmin,
    isAdmin,
    isEmployee,
    isHrAdmin,
    isMaster,
    isSupport
  };
}

 
