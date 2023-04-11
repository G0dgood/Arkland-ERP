import { useState, useEffect, useCallback } from "react";
import { InterfaceAction } from "../interfaces/base";
import { getRequestOptions } from "../utils/auth/header";
import { handleUnauthorizedError } from "../functions/auth";

export const useDepartments = (newDepartmentCreated: InterfaceAction) => {
  const [departments, setDepartments] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateDepartments = useCallback((data: any) => {
    setDepartments(data);
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
          `${process.env.REACT_APP_API}/hr/departments`,
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
          setDepartments(responseData.data);
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
  }, [retryCount, newDepartmentCreated, updateDepartments]);

  return {
    departments,
    isLoading,
    error,
    message,
    setLoading,
  };
};

export const useDepartmentById = (id: string) => {
  const [department, setDepartment] = useState([] as any);
  const [departmentMembers, setDepartmentMembers] = useState({} as any);
  const [isLoading, setLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateDepartmentById = useCallback((data: any) => {
    setDepartment(data);
    setDepartmentMembers(data);
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
        // const response = await fetch(
        //   `${process.env.REACT_APP_API}/hr/departments/${id}`,
        //   getRequestOptions
        // );
        // const isJsonResponse = response.headers
        //   ?.get("content-type")
        //   ?.includes("application/json");
        // const responseData = isJsonResponse && (await response.json());

        // if (response.status === 401) {
        //   handleUnauthorizedError();
        // } else if (!response.ok) {
        //   throw new Error(responseData.message || response.status.toString());
        // }
        // if (isMounted) {
        //   setDepartment(responseData.data.department);
        //   setLoading(false);
        // }
        // setMembersLoading(true);
        const responseDepartmentMembers = await fetch(
          `${process.env.REACT_APP_API}/hr/employees?department=${id}`,
          getRequestOptions
        );
        const isJsonResponseDepartmentMembers =
          responseDepartmentMembers.headers
            ?.get("content-type")
            ?.includes("application/json");
        const dataDepartmentsMembers =
          isJsonResponseDepartmentMembers &&
          (await responseDepartmentMembers.json());
        if (!responseDepartmentMembers.ok) {
          throw new Error(
            dataDepartmentsMembers.message || responseDepartmentMembers.status
          );
        }
        if (isMounted) {
          setDepartmentMembers(dataDepartmentsMembers.data);
        }
        setMembersLoading(false);
        setRetryCount(0);
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
  }, [retryCount, id, updateDepartmentById]);

  return {
    // department,
    departmentMembers,
    // isLoading,
    membersLoading,
    error,
    message,
    setLoading,
  };
};
