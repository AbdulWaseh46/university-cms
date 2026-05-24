import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import EnrollmentTable from '../components/EnrollmentTable';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, deleteStudent, getStudentEnrollments } = useAppContext();

  const student = students.find(s => s.id === id);
  const enrollments = student ? getStudentEnrollments(id) : [];

  if (!student) {
    return (
      <div>
        <div className="page-header">
          <h1>Student Not Found</h1>
        </div>
        <div className="empty-state">
          <span className="empty-icon">❓</span>
          <h3>This student doesn't exist</h3>
          <p>They may have been deleted or the ID is incorrect.</p>
        </div>
        <Link to="/students" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
          ← Back to Students
        </Link>
      </div>
    );
  }

  const initials = student.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleDelete = () => {
    if (window.confirm(`Permanently remove "${student.name}"? All enrollments will be deleted too.`)) {
      deleteStudent(id);
      navigate('/students');
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  // Calculate total credits
  const totalCredits = enrollments.reduce((sum, e) => sum + (e.course?.credits || 0), 0);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '20px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        <Link to="/students" className="link">Students</Link>
        {' '} / {student.name}
      </div>

      {/* Profile header */}
      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '32px',
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Avatar */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--gold)',
          flexShrink: 0,
        }}>
          {initials}
        </div>

        {/* Details */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', color: 'var(--navy)', marginBottom: '6px' }}>
            {student.name}
          </h1>
          <p style={{ color: 'var(--text-mid)', marginBottom: '14px' }}>{student.email}</p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span className="badge badge-navy">📖 {student.major}</span>
            <span className="badge badge-gold">🎓 {student.year}</span>
            <span className="badge badge-success">{enrollments.length} courses enrolled</span>
            {totalCredits > 0 && (
              <span className="badge badge-navy">⭐ {totalCredits} total credits</span>
            )}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
            Student ID: <strong>{student.id}</strong>
            &nbsp;·&nbsp;
            Registered: <strong>{formatDate(student.createdAt)}</strong>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <Link to="/enroll" className="btn btn-gold btn-sm">
            + Enroll in Course
          </Link>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete Student
          </button>
        </div>
      </div>

      {/* Enrollments */}
      <div className="section-title">Enrolled Courses</div>

      {enrollments.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📚</span>
          <h3>Not enrolled in any courses</h3>
          <p>
            <Link to="/enroll" className="link">Go to the Enroll page</Link> to add this student to a course.
          </p>
        </div>
      ) : (
        <EnrollmentTable
          enrollments={enrollments}
          showStudent={false}
          showCourse={true}
        />
      )}
    </div>
  );
};

export default StudentDetail;
