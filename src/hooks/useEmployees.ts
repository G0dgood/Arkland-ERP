import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestOptions } from "../utils/auth/header";
import { fireAlert } from "../utils/Alert";
import { handleUnauthorizedError } from "../functions/auth";
const token = Cookies.get("token");

export const useEmployees = () => {
  const [employees, setEmployees] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateEmployees = useCallback((data: any) => {
    setEmployees(data);
    setLoading(false);
    setError("");
    setRetryCount(0);
    setMessage("");
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/hr/employees`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const responseData = isJsonResponse && (await response.json());

        if (response.status === 401) {
          handleUnauthorizedError();
        } else if (!response.ok) {
          throw new Error(responseData.message || response.status.toString());
        }

        if (isMounted) {
          setEmployees(responseData.data);
          setLoading(false);
          setError("");
          setRetryCount(0);
          setMessage("");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error.message || "Something went wrong");
        setMessage(error.message || "Something went wrong");

        const statusCode = error.message;
        if (
          retryCount < 5 &&
          statusCode &&
          statusCode >= 500 &&
          statusCode < 600
        ) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 5000);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [retryCount, updateEmployees]);

  return {
    employees,
    isLoading,
    error,
    message,
    setLoading,
  };
};

export const useEmployeeById = (id: string) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([] as any);
  const [salary, setSalary] = useState({} as any);
  const [isLoading, setLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateEmployeeById = useCallback((data: any) => {
    setEmployee(data);
    setSalary(data);
    setLoading(false);
    setError("");
    setRetryCount(0);
    setMessage("");
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/hr/employees/${id}`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const responseData = isJsonResponse && (await response.json());
        if (response.status === 401) {
          handleUnauthorizedError();
        } else if (!response.ok) {
          throw new Error(responseData.message || response.status.toString());
        }

        if (isMounted) {
          setEmployee(responseData.data.employee);
          setSalary(responseData.data.salary);
          setLoading(false);
          setError("");
          setRetryCount(0);
          setMessage("");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error.message || "Something went wrong");
        setMessage(error.message || "Something went wrong");

        const statusCode = error.message;
        if (
          retryCount < 5 &&
          statusCode &&
          statusCode >= 500 &&
          statusCode < 600
        ) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 5000);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [retryCount, id, updateEmployeeById]);

  const handleEmployeeDeletion = async () => {
    setDeleteLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/employees/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const title = "Employed deleted.";
        const html = `Employee deleted`;
        const icon = "success";
        fireAlert(title, html, icon);
        setDeleteLoading(false);
        navigate(-1);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setDeleteLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Employee deletion failed";
      fireAlert(title, html, icon);
    }
  };
  return {
    employee,
    salary,
    isLoading,
    isDeleteLoading,
    handleEmployeeDeletion,
  };
};
