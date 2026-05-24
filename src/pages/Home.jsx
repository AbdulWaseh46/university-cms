import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { students, courses, enrollments } = useAppContext();

  // Recent 5 enrollments (newest first)
  const recent = [...enrollments]
    .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
    .slice(0, 5);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to the University Course Management System</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">👤</span>
          <div className="stat-number">{students.length}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📚</span>
          <div className="stat-number">{courses.length}</div>
          <div className="stat-label">Total Courses</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div className="stat-number">{enrollments.length}</div>
          <div className="stat-label">Enrollments</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div className="stat-number">
            {students.length > 0
              ? (enrollments.length / students.length).toFixed(1)
              : '0'}
          </div>
          <div className="stat-label">Avg. Courses/Student</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-title">Quick Actions</div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <Link to="/students" className="btn btn-primary">
          ＋ Add Student
        </Link>
        <Link to="/courses" className="btn btn-gold">
          ＋ Add Course
        </Link>
        <Link to="/enroll" className="btn btn-outline">
          ✚ Enroll Student
        </Link>
        <Link to="/enrollments" className="btn btn-outline">
          📋 View All Enrollments
        </Link>
      </div>

      {/* Recent Enrollments */}
      <div className="section-title">Recent Enrollments</div>
      {recent.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No enrollments yet</h3>
          <p>Start by adding students and courses, then enroll them.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(e => {
                const student = students.find(s => s.id === e.studentId);
                const course  = courses.find(c  => c.id === e.courseId);
                return (
                  <tr key={e.id}>
                    <td>
                      <Link to={`/student/${e.studentId}`} className="link">
                        {student?.name || 'Unknown'}
                      </Link>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{course?.name || 'Unknown'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>
                        {course?.code}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                      {formatDate(e.enrolledAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Getting Started hint */}
      {students.length === 0 && courses.length === 0 && (
        <div className="alert alert-warning" style={{ marginTop: '28px' }}>
          🚀 <strong>Getting Started:</strong> Add some students and courses, then use the Enroll page to connect them!
        </div>
      )}
    </div>
  );
};

export default Home;
