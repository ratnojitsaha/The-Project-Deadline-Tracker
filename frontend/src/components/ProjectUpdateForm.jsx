function ProjectUpdateForm({
  projects,
  selectedProject,
  status,
  notes,
  submitting,
  onProjectChange,
  onStatusChange,
  onNotesChange,
  onSubmit
}) {
  return (
    <section className="card">

      <div className="section-header">

        <div>
          <h2>Log Entry Form</h2>

          <p>
            Update a project's status or add tracking notes.
          </p>
        </div>

      </div>


      <form
        className="update-form"
        onSubmit={onSubmit}
      >

        <div className="form-group">

          <label htmlFor="project">
            Project
          </label>

          <select
            id="project"
            value={selectedProject}
            onChange={onProjectChange}
          >

            <option value="">
              Select a project
            </option>

            {projects.map((project) => (

              <option
                key={project.id}
                value={project.id}
              >
                {project.project_name}
              </option>

            ))}

          </select>

        </div>


        <div className="form-group">

          <label htmlFor="status">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={onStatusChange}
          >

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>


        <div className="form-group full-width">

          <label htmlFor="notes">
            Tracking Notes
          </label>

          <textarea
            id="notes"
            rows="4"
            placeholder="Add a progress update or timeline note..."
            value={notes}
            onChange={onNotesChange}
          />

        </div>


        <div className="form-actions">

          <button
            type="submit"
            disabled={submitting || !selectedProject}
          >
            {submitting
              ? "Saving..."
              : "Save Update"}
          </button>

        </div>

      </form>

    </section>
  );
}

export default ProjectUpdateForm;