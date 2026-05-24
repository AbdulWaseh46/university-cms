import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import EnrollmentTable from '../components/EnrollmentTable';

const Enrollments = () => {
  const { enrollments, students, courses } = useAppContext();
  const [search, setSearch] = useState('');

  // Filter enrollments by student name or course name
  const filtered = enrollments.filter(e => {
    const student = students.find(s => s.id === e.studentId);
    const course  = courses.find(c => c.id === e.courseId);
    const q = search.toLowerCase();
    return (
      student?.name.toLowerCase().includes(q) ||
      course?.name.toLowerCase().includes(q)  ||
      course?.code.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="page-header">
        <h1>All Enrollments</h1>
        <p>View and manage every student–course enrollment in the system.</p>
      </div>

      {/* Summary stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '28px' }}>
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div className="stat-number">{enrollments.length}</div>
          <div className="stat-label">Total Enrollments</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👤</span>
          <div className="stat-number">
            {new Set(enrollments.map(e => e.studentId)).size}
          </div>
          <div className="stat-label">Students Enrolled</div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📚</span>
          <div className="stat-number">
            {new Set(enrollments.map(e => e.courseId)).size}
          </div>
          <div className="stat-label">Courses Active</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search by student name or course…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Count */}
      {enrollments.length > 0 && (
        <div style={{ marginBottom: '16px', color: 'var(--text-mid)', fontSize: '0.9rem' }}>
          Showing <strong>{filtered.length}</strong> of <strong>{enrollments.length}</strong> enrollments
        </div>
      )}

      {/* Table */}
      <EnrollmentTable enrollments={filtered} showStudent showCourse />
    </div>
  );
};

export default Enrollments;
