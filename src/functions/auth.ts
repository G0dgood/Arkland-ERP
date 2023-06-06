import { sessionExpired, updatePassword } from "../utils/sessionExpires";
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
} {

   
  const userString =  dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`) 
  const userInfo = userString ? userString : null;
  const privileges = userInfo?.privileges || [];

  console.log('userInfo',userInfo?.privileges)

  const isSuperAdmin = privileges.some((p: any) => p.role === "super admin");
  const isAdmin = privileges.some((p: any) => p.role === "admin");
  const isTeamLead = privileges.some((p: any) => p.role === "team lead");
  const isEmployee = privileges.some((p: any) => p.role === "employee");
  const isHeadOfDepartment = privileges.some( (p: any) => p.role === "head of department" );
  const isHRHead = privileges.some((p: any) => p.role === "HR head");
  const isHrAdmin = privileges.some((p: any) => p.role === "HR admin");

  return {
    isHRHead,
    isHeadOfDepartment,
    isTeamLead,
    isSuperAdmin,
    isAdmin,
    isEmployee,
    isHrAdmin,
  };
}

export async function handleUnauthorizedError() {
  // const meResponse = await fetch(
  //   `${process.env.REACT_APP_API}/me`,
  //   getRequestOptions
  // );
  // const meData = await meResponse.json();
  // if (meData?.data?.user?.require_new_password === true) {
  //   updatePassword().then(() => {
  //     window.location.replace("/update-password");
  //   });
  // } else {
    // sessionExpired().then(() => {
    //   removeData();
    //   window.location.replace("/");
    //   window.location.reload();
    // });
  // }
}
