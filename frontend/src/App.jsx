import { useState } from "react";

import Header from "./components/Header";
import Alert from "./components/Alert";
import ProjectDashboard from "./components/ProjectDashboard";
import ProjectUpdateForm from "./components/ProjectUpdateForm";
import HistoryFeed from "./components/HistoryFeed";

import useProjects from "./hooks/useProjects";

import {
  formatDate,
  formatDateTime,
  isOverdue
} from "./utils/dateUtils";

import "./App.css";


function App() {

  const {
    projects,
    logs,

    loadingProjects,
    loadingLogs,

    submitting,

    error,
    success,

    saveProjectUpdate
  } = useProjects();


  const [
    selectedProject,
    setSelectedProject
  ] = useState("");


  const [
    status,
    setStatus
  ] = useState("In Progress");


  const [
    notes,
    setNotes
  ] = useState("");


  const handleProjectChange = (event) => {

    const projectId =
      event.target.value;

    setSelectedProject(projectId);

    const project = projects.find(
      (project) =>
        String(project.id) === projectId
    );

    if (project) {
      setStatus(project.status);
    }
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!selectedProject) {
      return;
    }

    await saveProjectUpdate({
      project_id: Number(selectedProject),
      status,
      notes
    });

    setNotes("");
  };


  return (
    <div className="app">

      <Header />

      <main className="container">

        <Alert
          type="error"
          message={error}
        />

        <Alert
          type="success"
          message={success}
        />

        <ProjectDashboard
          projects={projects}
          loading={loadingProjects}
          formatDate={formatDate}
          formatDateTime={formatDateTime}
          isOverdue={isOverdue}
        />

        <ProjectUpdateForm
          projects={projects}
          selectedProject={selectedProject}
          status={status}
          notes={notes}
          submitting={submitting}
          onProjectChange={handleProjectChange}
          onStatusChange={(event) =>
            setStatus(event.target.value)
          }
          onNotesChange={(event) =>
            setNotes(event.target.value)
          }
          onSubmit={handleSubmit}
        />

        <HistoryFeed
          logs={logs}
          loading={loadingLogs}
          formatDateTime={formatDateTime}
        />

      </main>

    </div>
  );
}

export default App;