import { useEffect, useState } from "react";

import {
  getProjects,
  getLogs,
  updateProject
} from "../services/projectService";


const useProjects = () => {

  const [projects, setProjects] =
    useState([]);

  const [logs, setLogs] =
    useState([]);

  const [loadingProjects, setLoadingProjects] =
    useState(true);

  const [loadingLogs, setLoadingLogs] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  const fetchProjects = async () => {

    try {

      setLoadingProjects(true);

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load projects."
      );

    } finally {

      setLoadingProjects(false);

    }
  };


  const fetchLogs = async () => {

    try {

      setLoadingLogs(true);

      const data = await getLogs();

      setLogs(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load activity history."
      );

    } finally {

      setLoadingLogs(false);

    }
  };


  const saveProjectUpdate = async (
    projectData
  ) => {

    try {

      setSubmitting(true);

      setError("");
      setSuccess("");

      await updateProject(projectData);

      setSuccess(
        "Project updated successfully."
      );

      await Promise.all([
        fetchProjects(),
        fetchLogs()
      ]);

    } catch (error) {

      console.error(error);

      setError(
        error.message ||
        "Failed to update project."
      );

      throw error;

    } finally {

      setSubmitting(false);

    }
  };


  useEffect(() => {

    fetchProjects();
    fetchLogs();

  }, []);


  return {
    projects,
    logs,

    loadingProjects,
    loadingLogs,

    submitting,

    error,
    success,

    saveProjectUpdate,

    setError,
    setSuccess
  };
};


export default useProjects;