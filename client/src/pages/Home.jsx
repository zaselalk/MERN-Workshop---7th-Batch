import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import axiosClient from "../api/axiosClient";

export const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  async function getStudents(showLoading = true) {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const { data } = await axiosClient.get("/students");
      setStudents(data);
    } catch {
      setStudents([]);
    }
    setLoading(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const name = event.target.name.value.trim();
    const age = event.target.age.value;

    await axiosClient.post("/students", { name, age });

    formRef.current.reset();
    setSubmitting(false);
    getStudents();
  };

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const { data } = await axiosClient.get("/students");
        setStudents(data);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
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
        <section className="card form-card">
          <div className="card-header">
            <h2 className="card-title">Add New Student</h2>
            <p className="card-desc">
              Fill in the details below to register a new student.
            </p>
          </div>
          <form onSubmit={handleSubmit} ref={formRef} className="student-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-input"
                placeholder="e.g. 20"
                min="1"
                max="100"
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Adding..." : "Add Student"}
            </button>
          </form>
        </section>

        <section className="card list-card">
          <div className="card-header">
            <h2 className="card-title">All Students</h2>
            <span className="badge">{students.length}</span>
          </div>
          {loading ? (
            <div className="state-container">
              <div className="spinner"></div>
              <p className="state-text">Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            <div className="state-container">
              <div className="empty-icon">&#128100;</div>
              <p className="state-text">No students found. Add one above!</p>
            </div>
          ) : (
            <ul className="student-list">
              {students.map((student, index) => (
                <Link
                  to={`/${student.id}`}
                  key={student.id ?? index}
                  className="student-link"
                >
                  <li key={student.id ?? index} className="student-item">
                    <div className="student-avatar">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="student-info">
                      <span className="student-name">{student.name}</span>
                      <span className="student-meta">Age {student.age}</span>
                    </div>
                    <span className="student-id">#{index + 1}</span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};
