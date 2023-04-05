import { useState, useEffect, useCallback } from "react";
import { getRequestOptions } from "../utils/auth/header";
import Cookies from "js-cookie";
import { fireAlert } from "../utils/Alert";
import { handleUnauthorizedError } from "../functions/auth";

const token = Cookies.get("token");

export const useProjects = () => {
  const [projects, setProjects] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");

  const updateProjects = useCallback((data: any) => {
    setProjects(data);
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
          `${process.env.REACT_APP_API}/hr/projects`,
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
          setProjects([...responseData.data]);
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
  }, [retryCount, updateProjects]);

  return {
    projects,
    isLoading,
    error,
    message,
    setLoading,
  };
};

export const useProjectById = (id: string) => {
  const [projects, setProjects] = useState({} as any);
  const [projectsTasks, setProjectsTasks] = useState({} as any);
  const [teamMembers, setTeamMembers] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [isProjectTasksLoading, setProjectTasksLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [retryCount, setRetryCount] = useState(0);
  const [message, setMessage] = useState("");
  const [taskCreateShow, setTaskCreateShow] = useState(false);
  const [newTaskCreated, setNewTaskCreated] = useState({} as any);
  const [isTeamLoading, setTeamLoading] = useState(false);

  const updateProjectById = useCallback((data: any) => {
    setProjects(data);
    setProjectsTasks(data);
    setTeamMembers(data);
    setLoading(false);
    setError("");
    setRetryCount(0);
    setMessage("");
  }, []);

  const handleNewTaskCreated = () => {
    setNewTaskCreated(!newTaskCreated);
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseProjects = await fetch(
          `${process.env.REACT_APP_API}/hr/projects/${id}`,
          getRequestOptions
        );
        const isJsonResponseProjects = responseProjects.headers
          ?.get("content-type")
          ?.includes("application/json");
        const dataProjects =
          isJsonResponseProjects && (await responseProjects.json());

        if (responseProjects.status === 401) {
          handleUnauthorizedError();
        } else if (!responseProjects.ok) {
          throw new Error(
            dataProjects.message || responseProjects.status.toString()
          );
        }
        setProjects(dataProjects.data);

        const urlForTeamMembers = `${process.env.REACT_APP_API}/hr/teams/${dataProjects.data.team}/employees`;

        setProjectTasksLoading(true);
        const responseProjectsTasks = await fetch(
          `${process.env.REACT_APP_API}/tasks?project=${id}`,
          getRequestOptions
        );
        const isJsonResponseProjectsTasks = responseProjectsTasks.headers
          ?.get("content-type")
          ?.includes("application/json");
        const dataProjectsTasks =
          isJsonResponseProjectsTasks && (await responseProjectsTasks.json());
        if (!responseProjectsTasks.ok) {
          throw new Error(
            dataProjectsTasks.message || responseProjectsTasks.status
          );
        }
        setProjectsTasks(dataProjectsTasks.data);
        setProjectTasksLoading(false);

        setTeamLoading(true);
        const responseProjectsTeamMembers = await fetch(
          urlForTeamMembers,
          getRequestOptions
        );
        const isJsonResponseProjectsTeamMembers =
          responseProjectsTeamMembers.headers
            ?.get("content-type")
            ?.includes("application/json");
        const dataProjectsTeamMembers =
          isJsonResponseProjectsTeamMembers &&
          (await responseProjectsTeamMembers.json());
        if (!responseProjectsTeamMembers.ok) {
          throw new Error(
            dataProjectsTeamMembers.message ||
              responseProjectsTeamMembers.status
          );
        }
        setTeamMembers(dataProjectsTeamMembers.data);
        setTeamLoading(false);

        setLoading(false);
        setError("");
        setMessage("");
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
  }, [retryCount, newTaskCreated, updateProjectById]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setProjectTasksLoading(true);
    console.log("values", values);
    const getProjectId = { project: id };

    const createTaskValues = { ...values, ...getProjectId };
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/tasks`, {
        method: "POST",
        body: JSON.stringify(createTaskValues),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const title = "Task created successfully.";
        const html = `Task created`;
        const icon = "success";
        fireAlert(title, html, icon);
        handleNewTaskCreated();
        setTaskCreateShow(false);
        resetForm(values);
        setProjectTasksLoading(false);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Task creation failed";
      fireAlert(title, html, icon);
    }
  };

  const deleteTask = async (taskId: string) => {
    setProjectTasksLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setProjectTasksLoading(false);
      if (response.ok) {
        setProjectsTasks((prevTasks: any) =>
          prevTasks.filter((task: any) => task.id !== taskId)
        );
        const title = "Task deleted.";
        const html = `Task deleted`;
        const icon = "success";
        fireAlert(title, html, icon);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      setProjectTasksLoading(false);
      const html = error.message || "Something went wrong!";
      const icon = "error";
      const title = "Task deletion failed";
      fireAlert(title, html, icon);
    }
  };

  return {
    projects,
    projectsTasks,
    teamMembers,
    isLoading,
    error,
    message,
    isProjectTasksLoading,
    taskCreateShow,
    isTeamLoading,
    setTaskCreateShow,
    deleteTask,
    handleSubmit,
  };
};
