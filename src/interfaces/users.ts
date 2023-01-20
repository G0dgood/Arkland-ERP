export interface userInfoInterface {
  deactivated: boolean;
  email: string;
  firstName: string;
  lastName: string;
  loggedInUser: boolean;
  projects: Number;
}

export interface userInterface {
  aud: string;
  exp: string;
  groups: string[];
  is_admin: boolean;
  is_agent: boolean;
  is_user: boolean;
  is_deactivated: boolean;
  is_returning_member: boolean;
  is_verified: boolean;
}
