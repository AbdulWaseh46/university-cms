import React from 'react';
import { useAppContext } from '../context/AppContext';

const CourseCard = ({ course }) => {
  const { deleteCourse, getCourseEnrollments } = useAppContext();
  const enrolled = getCourseEnrollments(course.id);

  const handleDelete = () => {
    if (window.confirm(`Remove "${course.name}"? All enrollments in this course will be deleted too.`)) {
      deleteCourse(course.id);
    }
  };

  return (
    <div className="course-card">
      {/* Course code */}
      <div className="course-code">◈ {course.code}</div>

      {/* Course name */}
      <div className="course-name">{course.name}</div>

      {/* Description */}
      {course.description && (
        <div className="course-desc">{course.description}</div>
      )}

      {/* Meta info */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <span className="badge badge-navy">
          👨‍🏫 {course.instructor}
        </span>
        <span className="badge badge-gold">
          ⭐ {course.credits} Credit{course.credits !== 1 ? 's' : ''}
        </span>
        <span className="badge badge-success">
          {enrolled.length} Enrolled
        </span>
      </div>

      {/* ID */}
      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '16px' }}>
        ID: <strong>{course.id}</strong>
      </div>

      {/* Actions */}
      <button className="btn btn-danger btn-sm" onClick={handleDelete}>
        Delete Course
      </button>
    </div>
  );
};

export default CourseCard;
