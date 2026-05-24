import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

/**
 * EnrollmentTable – reusable table for listing enrollments.
 * Props:
 *   enrollments  – array of enrollment objects (each may have .student and/or .course already joined)
 *   showStudent  – whether to show the Student column (default true)
 *   showCourse   – whether to show the Course column (default true)
 */
const EnrollmentTable = ({
  enrollments,
  showStudent = true,
  showCourse = true,
}) => {
  const { removeEnrollment, students, courses } = useAppContext();

  // Enrich enrollments if not already joined
  const enriched = enrollments.map(e => ({
    ...e,
    student: e.student || students.find(s => s.id === e.studentId),
    course:  e.course  || courses.find(c  => c.id === e.courseId),
  }));

  if (enriched.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📋</span>
        <h3>No Enrollments Yet</h3>
        <p>Go to the Enroll page to add students to courses.</p>
      </div>
    );
  }

  const handleRemove = (e) => {
    if (window.confirm('Remove this enrollment?')) {
      removeEnrollment(e.id);
    }
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            {showStudent && <th>Student</th>}
            {showCourse  && <th>Course</th>}
            <th>Enrolled On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enriched.map((e, idx) => (
            <tr key={e.id}>
              <td style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                {idx + 1}
              </td>

              {showStudent && (
                <td>
                  {e.student ? (
                    <Link to={`/student/${e.student.id}`} className="link">
                      {e.student.name}
                    </Link>
                  ) : (
                    <span style={{ color: 'var(--text-light)' }}>Unknown</span>
                  )}
                </td>
              )}

              {showCourse && (
                <td>
                  {e.course ? (
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--navy)' }}>
                        {e.course.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>
                        {e.course.code}
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-light)' }}>Unknown</span>
                  )}
                </td>
              )}

              <td style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                {formatDate(e.enrolledAt)}
              </td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(e)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentTable;
