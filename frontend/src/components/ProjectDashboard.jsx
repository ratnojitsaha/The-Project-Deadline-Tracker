function ProjectDashboard({
  projects,
  loading,
  formatDate,
  formatDateTime,
  isOverdue
}) {
  return (
    <section className="card">

      <div className="section-header">

        <div>
          <h2>Live Status</h2>

          <p>
            Current project delivery status
          </p>
        </div>

        <span className="count-badge">
          {projects.length} Projects
        </span>

      </div>


      {loading ? (

        <div className="loading">
          Loading projects...
        </div>

      ) : projects.length === 0 ? (

        <div className="empty">
          No projects found.
        </div>

      ) : (

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Project</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>

            <tbody>

              {projects.map((project) => (

                <tr
                  key={project.id}
                  className={
                    isOverdue(project)
                      ? "overdue-row"
                      : ""
                  }
                >

                  <td>
                    <strong>
                      {project.project_name}
                    </strong>
                  </td>

                  <td>
                    {formatDate(project.deadline_date)}

                    {isOverdue(project) && (
                      <span className="overdue-label">
                        Overdue
                      </span>
                    )}
                  </td>

                  <td>
                    <span
                      className={`status ${project.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td>
                    {formatDateTime(project.updated_at)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}

export default ProjectDashboard;