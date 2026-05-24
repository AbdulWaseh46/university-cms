import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const StudentCard = ({ student }) => {
  const { deleteStudent, getStudentEnrollments } = useAppContext();
  const enrolled = getStudentEnrollments(student.id);

  // Generate initials for avatar
  const initials = student.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const yearColors = {
    '1st Year': 'badge-navy',
    '2nd Year': 'badge-gold',
    '3rd Year': 'badge-success',
    '4th Year': 'badge-danger',
  };

  const handleDelete = () => {
    if (window.confirm(`Remove "${student.name}"? All their enrollments will be deleted too.`)) {
      deleteStudent(student.id);
    }
  };

  return (
    <div className="student-card">
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div className="student-avatar">{initials}</div>
        <div className="student-info">
          <h3>{student.name}</h3>
          <p>{student.email}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="student-meta">
        <span className={`badge ${yearColors[student.year] || 'badge-navy'}`}>
          🎓 {student.year}
        </span>
        <span className="badge badge-gold">
          📖 {student.major}
        </span>
        <span className="badge badge-success">
          {enrolled.length} course{enrolled.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ID */}
      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
        ID: <strong>{student.id}</strong>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <Link
          to={`/student/${student.id}`}
          className="btn btn-outline btn-sm"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          View Details
        </Link>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
