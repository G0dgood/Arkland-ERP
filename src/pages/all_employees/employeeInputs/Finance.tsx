import { Form, Formik } from "formik";
import * as Yup from "yup";
import Cleave from "cleave.js/react";
import InputField from "../../../components/Inputs/InputField";
import { EmployeeFormProps } from "../../interfaces/employee";
import CustomInputField from "../../../components/Inputs/CustomInputField";
import { removeNonNumeric } from "../../../utils/numbers";
import { useEffect, useState } from "react";

const Finance = ({
 active,
 employee,
 setEmployee,
 setActive,
 bindSubmitForm,
}: EmployeeFormProps) => {
 const validate = Yup.object().shape({
  bank_name: Yup.string().required("Bank name is required"),
  bank_account_number: Yup.string().required(
   "Bank account number is required"
  ),
  // basic_salary: Yup.string().required("Basic salary is required"),
  salary: Yup.string().required("Gross salary is required"),
 });
 const [gross_salary, setgsross_salary] = useState<any>(0)




 const [inputs, setInputs] = useState({

  basic_salary: "",
  meal_allowance: "",
  utility_allowance: "",
  medical_allowance: "",
  housing_allowance: "",
  transportation_allowance: "",

 });

 useEffect(() => {
  setInputs((prevState: any) => ({
   ...prevState,
   basic_salary: gross_salary * 0.3,
   meal_allowance: gross_salary * 0.1,
   utility_allowance: gross_salary * 0.1,
   medical_allowance: gross_salary * 0.1,
   housing_allowance: gross_salary * 0.15,
   transportation_allowance: gross_salary * 0.15,
  }));
 }, [gross_salary])




 const handleSubmit = (values?: any) => {
  // console.log("Values", values);
  setEmployee({ ...employee, ...values });
  setActive(3);
 };

 return (
  <div className={active === 2 ? "EssentialsContainer" : "d-none"}>
   <Formik
    enableReinitialize
    initialValues={{
     bank_name: "",
     bank_account_number: "",
     bank_account_name: "",
     salary: "",
     // basic_salary: inputs.basic_salary,
     // meal_allowance: inputs.meal_allowance,
     // utility_allowance: inputs.utility_allowance,
     // medical_allowance: inputs.medical_allowance,
     // housing_allowance: inputs.housing_allowance,
     // transportation_allowance: inputs.transportation_allowance,
    }}
    onSubmit={handleSubmit}
    validationSchema={validate}
   >
    {({ values, setFieldValue, submitForm }) => {
     if (active === 2) {
      bindSubmitForm(submitForm);
     }

     return (
      <Form>
       <div className="testbox pb-5" >
        <form>
         <div className="imput-space" />
         <div className="row-item">
          <div className="col">
           <div className="form-group">
            <InputField
             label="Bank Name"
             name="bank_name"
             placeholder="Enter bank name"
            />
           </div>
          </div>
          <div className="imput-space" />
          <div className="col">
           <div className="form-group">
            <CustomInputField
             type="number"
             maxLength={10}
             label="BANK ACCOUNT NUMBER"
             name="bank_account_number"
             placeholder="ENTER BANK ACCOUNT NUMBER"
             onChange={(event: any) => {
              setFieldValue(
               "bank_account_number",
               event?.target.value
              );
             }}
            />
           </div>
          </div>
         </div>
         <div className="row-item">
          <div className="col">
           <div className="form-group">
            <InputField
             label="Bank Account Name"
             name="bank_account_name"
             placeholder="Enter bank account name"
            />
           </div>
          </div>
          <div className="imput-space" />
          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Gross Salary
            </p>
            <Cleave
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: false,
             }}
             className="form-group__gender cleaveInput"
             id="salary"
             name="salary"
             placeholder="Enter employee Gross salary"
             value={values.salary}
             onChange={(event: any) => {
              setFieldValue(
               "salary",
               removeNonNumeric(event?.target.value)
              );
              setgsross_salary(values.salary)
             }}
             inputMode="numeric"
            />
           </div>
          </div>

         </div>
         <div className="row-item">

          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Basic Salary
            </p>
            <Cleave
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: true,
             }}
             className="form-group__gender cleaveInput"
             id="basic_salary"
             name="basic_salary"
             placeholder="Enter employee basic salary"
             value={inputs.basic_salary}
             // onChange={(event: any) => {
             //  setFieldValue(
             //   "basic_salary",
             //   removeNonNumeric(event?.target.value)
             //  );
             // }}
             inputMode="numeric"
            />
           </div>
          </div>
          <div className="imput-space" />
          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Utility Allowance
            </p>
            <Cleave
             disabled={true}
             placeholder="Enter employee utility allowance"
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: true,
             }}
             id="utility_allowance"
             className="form-group__gender cleaveInput"
             name="utility_allowance"
             value={inputs.utility_allowance}
             onChange={(event: any) => {
              setFieldValue(
               "utility_allowance",
               removeNonNumeric(event?.target.value)
              );
             }}
             inputMode="numeric"
            />
           </div>
          </div>
         </div>
         <div className="row-item">
          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Medical Allowance
            </p>
            <Cleave
             disabled={true}
             placeholder="Enter employee medical allowance"
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: true,
             }}
             id="medical_allowance"
             className="form-group__gender cleaveInput"
             name="medical_allowance"
             value={inputs.medical_allowance}
             onChange={(event: any) => {
              setFieldValue(
               "medical_allowance",
               removeNonNumeric(event?.target.value)
              );
             }}
             inputMode="numeric"
            />
           </div>
          </div>
          <div className="imput-space" />
          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Housing Allowance
            </p>
            <Cleave
             placeholder="Enter employee housing allowance"
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: true,
             }}
             id="housing_allowance"
             className="form-group__gender cleaveInput"
             name="housing_allowance"
             value={inputs.housing_allowance}
             onChange={(event: any) => {
              setFieldValue(
               "housing_allowance",
               removeNonNumeric(event?.target.value)
              );
             }}
             inputMode="numeric"
            />
           </div>
          </div>
         </div>
         <div className="row-item">
          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Transportation Allowance
            </p>
            <Cleave
             disabled={true}
             placeholder="Enter employee Transportation Allowance"
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: true,
             }}
             id="transportation_allowance"
             className="form-group__gender cleaveInput"
             name="transportation_allowance"
             value={inputs.transportation_allowance}
             onChange={(event: any) => {
              setFieldValue(
               "transportation_allowance",
               removeNonNumeric(event?.target.value)
              );
             }}
             inputMode="numeric"
            />
           </div>
          </div>
          <div className="imput-space" />
          <div className="col">
           <div className="form-group cleaveInput">
            <p className="sendmoney-select_acc-label">
             Meal Allowance
            </p>
            <Cleave
             disabled={true}
             placeholder="Enter employee meal allowance"
             options={{
              numeral: true,
              numeralThousandsGroupStyle: "thousand",
              prefix: "₦ ",
              rawValueTrimPrefix: true,
             }}
             id="meal_allowance"
             className="form-group__gender cleaveInput"
             name="meal_allowance"
             value={inputs.meal_allowance}
             onChange={(event: any) => {
              setFieldValue(
               "meal_allowance",
               removeNonNumeric(event?.target.value)
              );
             }}
             inputMode="numeric"
            />
           </div>
          </div>
         </div>
        </form>
       </div>
      </Form>
     );
    }}
   </Formik>
  </div>
 );
};

export default Finance;
