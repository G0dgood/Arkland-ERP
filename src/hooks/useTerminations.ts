import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestOptions } from "../utils/auth/header";
import { fireAlert } from "../utils/Alert";
import { handleUnauthorizedError } from "../functions/auth";
const token = Cookies.get("token");

export const useTerminationsById = (id: string) => {
  const navigate = useNavigate();
  const [terminations, setTerminations] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [isTerminateLoading, setTerminateLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateTerminationsById = useCallback((data: any) => {
    setTerminations(data);
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
          `${process.env.REACT_APP_API}/hr/terminations/${id}`,
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
          setTerminations(responseData.data);
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
  }, [retryCount, id, updateTerminationsById]);

  const handleEmployeeTermination = async () => {
    setTerminateLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/hr/terminations/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const title = "Employee terminated.";
        const html = `Termination successful`;
        const icon = "success";
        fireAlert(title, html, icon);
        setTerminateLoading(false);
        navigate("/terminations");
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setTerminateLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Request failed";
      fireAlert(title, html, icon);
    }
  };
  return {
    terminations,
    isLoading,
    isTerminateLoading,
    handleEmployeeTermination,
  };
};
