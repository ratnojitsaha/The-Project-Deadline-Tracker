export const getTodayDate = () => {

  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(today.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;
};


export const isOverdue = (project) => {

  return (
    project.status !== "Completed" &&
    project.deadline_date < getTodayDate()
  );
};


export const formatDate = (dateString) => {

  if (!dateString) {
    return "-";
  }

  const date =
    new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );
};


export const formatDateTime = (dateString) => {

  if (!dateString) {
    return "-";
  }

  const date =
    new Date(
      dateString.replace(" ", "T") + "Z"
    );

  return date.toLocaleString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  );
};