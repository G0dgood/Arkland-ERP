import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import InputField from "../../../components/Inputs/InputField";
import { Spinner } from "react-bootstrap";
import { fireAlert } from "../../../utils/Alert";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { useNavigate } from "react-router-dom";
import { reset, resetPassword } from "../../../features/User/userSlice";



const ResetPassword = ({ email }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resetisLoading, resetisSuccess } = useAppSelector((state: any) => state.userinfo)


  useEffect(() => {
    if (resetisSuccess) {
      fireAlert("Successful", "Password reset was successful", "success");

      setTimeout(() => {
        navigate("/");
      }, 5000);

      dispatch(reset());
    }
  }, [resetisSuccess, dispatch, navigate])


  const handleSubmit = async (values: any, { resetForm }: any) => {
    const inputs = { ...values, ...email };

    // @ts-ignore
    dispatch(resetPassword(inputs));
  };

  return (
    <div className="form-cont">
      <Formik
        initialValues={{
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <form>
              <div className="form-grp">
                <InputField
                  placeholder="Enter password"
                  label="Password"
                  name="password"
                  password
                  className="register-form-width"
                />
              </div>
            </form>
            <div className="form_btn">
              <Button
                variant="outlined"
                type="submit"
                className={"Add-btn-edit"}
              >
                {resetisLoading ? <Spinner animation="border" /> : "Update Password"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
