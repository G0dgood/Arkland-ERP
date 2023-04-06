import { useState, useEffect, useCallback } from "react";
import { InterfaceAction } from "../interfaces/base";
import { getRequestOptions } from "../utils/auth/header";
import { handleUnauthorizedError } from "../functions/auth";

export const useFetchTasks = (taskAction: InterfaceAction) => {
  const [tasks, setTasks] = useState({} as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateTasks = useCallback((data: any) => {
    setTasks(data);
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
          `${process.env.REACT_APP_API}/tasks`,
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

    // if (isMounted) {
    fetchData();
    // }

    return () => {
      isMounted = false;
    };
  }, [retryCount, updateTasks, taskAction]);

  return {
    tasks,
    isLoading,
    error,
    message,
    setLoading,
  };
};

export const useScheduleById = (viewAction: any) => {
  const [schedule, setSchedule] = useState([] as any);
  const [isScheduleLoading, setScheduleLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateScheduleById = useCallback((data: any) => {
    setSchedule(data);
    setScheduleLoading(false);
    setError("");
    setRetryCount(0);
    setMessage("");
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setScheduleLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API}/tasks/${viewAction[0]}`,
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
          setSchedule(responseData.data);
          setScheduleLoading(false);
          setError("");
          setRetryCount(0);
          setMessage("");
        }
      } catch (error: any) {
        setScheduleLoading(false);
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
  }, [retryCount, updateScheduleById, viewAction]);

  return {
    schedule,
    isScheduleLoading,
  };
};
