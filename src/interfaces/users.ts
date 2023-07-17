
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

export interface usersInterface {
  am_or_pm: string;
  created_at: string;
  created_by: string;
  day_created: number;
  email: string;
  employee: EmployeeInterface;
  first_name: string;
  full_name: string;
  gender: string;
  hour_created: number;
  id: string;
  is_active: Boolean;
  is_master: Boolean;
  is_super_admin: Boolean;
  last_active_at: string;
  last_name: string;
  month_created: number;
  phone: string;
  phone_country_code: string;
  phone_with_country_code: string;
  profile_pic_thumbnail_url: string;
  profile_pic_url: string;
  require_new_password: Boolean;
  status: string;
  updated_at: string;
  week_created: number;
  week_day_created: string;
  year_created: number;
  __v: number;
  _id: string;
}

export interface EmployeeInterface {
  address: string;
  bank_account_name: string;
  bank_account_number: number;
  bank_name: string;
  city: string;
  country: string;
  course_studied: string;
  created_at: string;
  created_by: string;
  date_of_birth: string;
  department: string;
  email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  employee_id: string;
  employment_date: string;
  employment_duration: number;
  employment_type: string;
  first_name: string;
  full_name: string;
  gender: string;
  has_attendance_ip_exemption: Boolean;
  has_disability: Boolean;
  has_work_location_objection: Boolean;
  id: string;
  institution_attended: string;
  is_expatriate: Boolean;
  last_name: string;
  marital_status: string;
  next_of_kin: string;
  next_of_kin_address: string;
  next_of_kin_email: string;
  next_of_kin_phone: string;
  nin: string;
  phone: string;
  phone_country_code: string;
  profile_pic_thumbnail_url: string;
  profile_pic_url: string;
  qualification: string;
  referee_name: string;
  referee_phone: string;
  role: string;
  salary: number;
  state_of_origin: string;
  status: string;
  tally_number: string;
  updated_at: string;
  user: string;
  zip_code: string;
  __v: number;
  _id: string;
}
