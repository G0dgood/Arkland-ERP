export interface EmployeeFormProps {
  setActive?: any;
  active?: any;
  next?: any;
  prev?: any;
  employee?: Object;
  options?: any;
  roleOptions?: any;
  handleChange?: any;
  handleSubmit?: any;
  ref?: any;
  props?: any;
  setEmployee?: any;
  values?: any;
  id?: string;
  bindSubmitForm?: any;
  roles:any
}

export interface CreateEmployeeProps {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  gender: string;
  institution_attended: string;
  course_studied: string;
  qualification: string;
  department: string;
  role: string;
  bank_name: string;
  bank_account_number: string;
  back_account_name: string;
  basic_salary: number;
  meal_allowance: number;
  utility_allowance: number;
  medical_allowance: number;
  housing_allowance: number;
  transportation_allowance: number;
  date_of_birth: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  next_of_kin_email: string;
  next_of_kin_address: string;
  referee_name: string;
  referee_phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  has_disability: string;
  has_work_location_objection: string;
  employment_date: string;
  employment_duration: string;
  employment_type: string;
  employee_id: string;
  tally_number: string;
  address: string;
  city: string;
  zip_code: string;
  state_of_origin: string;
  country: string;
  nin: string;
  marital_status: string;
}
