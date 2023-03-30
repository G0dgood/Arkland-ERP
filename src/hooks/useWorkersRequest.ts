import { useState, useEffect, useCallback } from "react";
import { getRequestOptions } from "../utils/auth/header";
import Cookies from "js-cookie";
import { useAppSelector } from "./useDispatch";

const token = Cookies.get("token");
export const useWorkersRequest = () => {
  const [requestWorkersList, setRequestWorkersList] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateWorkersRequest = useCallback((data: any) => {
    setRequestWorkersList(data);
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
          `${process.env.REACT_APP_API}/hr/workers-requests`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const responseData = isJsonResponse && (await response.json());

        if (!response.ok) {
          throw new Error(responseData.message || response.status.toString());
        }

        if (isMounted) {
          setRequestWorkersList([...responseData.data]);
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
  }, [retryCount, updateWorkersRequest]);

  return {
    requestWorkersList,
    isLoading,
    error,
    message,
    setLoading,
  };
};

export const useWorkersRequestById = (id: string) => {
  const [requestWorkersList, setRequestWorkersList] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateWorkersRequestById = useCallback((data: any) => {
    setRequestWorkersList(data);
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
          `${process.env.REACT_APP_API}/hr/workers-requests/${id}`,
          getRequestOptions
        );
        const isJsonResponse = response.headers
          ?.get("content-type")
          ?.includes("application/json");
        const responseData = isJsonResponse && (await response.json());

        if (!response.ok) {
          throw new Error(responseData.message || response.status.toString());
        }

        if (isMounted) {
          setRequestWorkersList(responseData.data);
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
  }, [retryCount, id, updateWorkersRequestById]);

  // const handleSubmit = async (requestId: string) => {
  //   setLoading(true);
  //   const getProjectId = { project: id };

  //   const createTaskValues = { ...values, ...getProjectId };
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API}/tasks`, {
  //       method: "POST",
  //       body: JSON.stringify(createTaskValues),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       const title = "Task created successfully.";
  //       const html = `Task created`;
  //       const icon = "success";
  //       fireAlert(title, html, icon);
  //       handleNewTaskCreated();
  //       setTaskCreateShow(false);
  //       resetForm(values);
  //       setProjectTasksLoading(false);
  //     } else {
  //       throw new Error(data.message || "Something went wrong!");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     setLoading(false);
  //     const html = error.message || "Something went wrong!";
  //     const icon = "error";
  //     const title = "Task creation failed";
  //     fireAlert(title, html, icon);
  //   }
  // };

  return {
    requestWorkersList,
    isLoading,
    error,
    message,
    setLoading,
  };
};

interface RoleWithEmployees {
  id: number;
  name: string;
  employees: any[];
}

export const useGetEmployeesWithRole = () => {
  const [rolesWithEmployee, setRolesWithEmployee] = useState<
    RoleWithEmployees[]
  >([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");
  const roles: any = useAppSelector((state) => state.roles.roles);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await Promise.all(
          roles.map(async (role: any) => {
            const roleData = { id: role.id, name: role.name, employees: [] };
            try {
              const response = await fetch(
                `${process.env.REACT_APP_API}/hr/employees?role=${role.id}`,
                getRequestOptions
              );
              const isJsonResponse = response.headers
                ?.get("content-type")
                ?.includes("application/json");
              const responseData = isJsonResponse && (await response.json());

              if (!response.ok) {
                throw new Error(
                  responseData.message || response.status.toString()
                );
              }

              roleData.employees = responseData;
            } catch (error: any) {
              setRolesWithEmployee((prevRoles) => {
                // find the role that corresponds to the error and update its properties
                const updatedRoles = prevRoles.map((prevRole) => {
                  if (prevRole.id === role.id) {
                    return {
                      ...prevRole,
                      isLoading: false,
                      error: error.message || "Something went wrong",
                    };
                  }
                  return prevRole;
                });
                return updatedRoles;
              });
            }
            return roleData;
          })
        );

        if (isMounted) {
          setRolesWithEmployee(data);
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
  }, [retryCount, roles]);

  return {
    rolesWithEmployee,
    isLoading,
    error,
    message,
  };
};
