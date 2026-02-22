import React, { useEffect } from "react";
import { Link, useParams } from "react-router";

export const Student = () => {
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/tasks/${params.student_id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-icon">&#127891;</div>
          <div>
            <h1 className="header-title">Student Registry</h1>
            <p className="header-subtitle">Manage and track student records</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {loading ? (
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="state-container">
              <div className="spinner"></div>
              <p className="state-text">Loading student...</p>
            </div>
          </div>
        ) : error ? (
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="state-container">
              <div className="empty-icon">&#9888;&#65039;</div>
              <p className="state-text">{error}</p>
              <Link
                to="/"
                className="btn-primary"
                style={{ marginTop: "0.5rem" }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <section className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Student Profile</h2>
                  <p className="card-desc">
                    Personal details for this student.
                  </p>
                </div>
                <Link to="/" className="badge" style={{ cursor: "pointer" }}>
                  &#8592; Back
                </Link>
              </div>
              <div className="student-item" style={{ background: "#f0f4ff" }}>
                <div className="student-avatar">
                  {student?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="student-info">
                  <span className="student-name">{student?.name}</span>
                  <span className="student-meta">Age {student?.age}</span>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="card-header">
                <h2 className="card-title">Tasks</h2>
                <span className="badge">{student?.Tasks?.length ?? 0}</span>
              </div>
              {!student?.Tasks || student.Tasks.length === 0 ? (
                <div className="state-container">
                  <div className="empty-icon">&#128203;</div>
                  <p className="state-text">No tasks assigned yet.</p>
                </div>
              ) : (
                <ul className="student-list">
                  {student.Tasks.map((task, index) => (
                    <li key={task._id ?? index} className="student-item">
                      <div
                        className="student-avatar"
                        style={{ borderRadius: "10px", fontSize: "0.8rem" }}
                      >
                        T{index + 1}
                      </div>
                      <div className="student-info">
                        <span className="student-name">{task.title}</span>
                        <span className="student-meta">{task.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};
