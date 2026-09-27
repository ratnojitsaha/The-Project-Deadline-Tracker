const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


export const getProjects = async () => {

  const response =
    await fetch(`${API_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
};


export const getLogs = async () => {

  const response =
    await fetch(`${API_URL}/api/logs`);

  if (!response.ok) {
    throw new Error("Failed to fetch logs");
  }

  return response.json();
};


export const updateProject = async ({
  project_id,
  status,
  notes
}) => {

  const response = await fetch(
    `${API_URL}/api/project-update`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        project_id,
        status,
        notes
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update project"
    );
  }

  return data;
};