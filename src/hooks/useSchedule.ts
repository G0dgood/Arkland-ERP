import { useState, useEffect } from "react";
import { InterfaceAction } from "../interfaces/base";
import { getRequestOptions } from "../utils/auth/header";

function useFetchTasks(taskAction: InterfaceAction) {
  const [tasks, setTasks] = useState({} as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/tasks`,
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
          setTasks(responseData.data);
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

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [retryCount, taskAction]);

  return {
    tasks,
    isLoading,
    error,
    message,
    setLoading,
  };
}

export default useFetchTasks;
