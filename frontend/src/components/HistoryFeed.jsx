function HistoryFeed({
  logs,
  loading,
  formatDateTime
}) {
  return (
    <section className="card">

      <div className="section-header">

        <div>
          <h2>History Feed</h2>

          <p>
            Latest 10 workflow updates
          </p>
        </div>

      </div>


      {loading ? (

        <div className="loading">
          Loading activity...
        </div>

      ) : logs.length === 0 ? (

        <div className="empty">
          No updates have been recorded yet.
        </div>

      ) : (

        <div className="history">

          {logs.map((log) => (

            <div
              className="history-item"
              key={log.id}
            >

              <div className="history-icon">
                ✓
              </div>

              <div className="history-content">

                <div className="history-top">

                  <strong>
                    {log.project_name}
                  </strong>

                  <span className="history-date">
                    {formatDateTime(log.updated_at)}
                  </span>

                </div>


                <div className="history-status">
                  Status changed to{" "}
                  <strong>
                    {log.status}
                  </strong>
                </div>


                {log.notes && (
                  <p className="history-notes">
                    {log.notes}
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default HistoryFeed;