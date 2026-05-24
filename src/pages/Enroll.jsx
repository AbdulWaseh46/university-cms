import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Enroll = () => {
  const { students, courses, enrollStudent, enrollments } = useAppContext();

  const [studentId, setStudentId] = useState('');
  const [courseId,  setCourseId]  = useState('');
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Check if already enrolled
  const alreadyEnrolled =
    studentId &&
    courseId &&
    enrollments.some(e => e.studentId === studentId && e.courseId === courseId);

  const validate = () => {
    const e = {};
    if (!studentId) e.student = 'Please select a student.';
    if (!courseId)  e.course  = 'Please select a course.';
    if (studentId && courseId && alreadyEnrolled)
      e.course = 'This student is already enrolled in this course!';
    return e;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const ok = enrollStudent(studentId, courseId);
    if (ok) {
      setSubmitted(true);
      setTimeout(() => {
        setStudentId('');
        setCourseId('');
        setErrors({});
        setSubmitted(false);
      }, 2500);
    }
  };

  const selectedStudent = students.find(s => s.id === studentId);
  const selectedCourse  = courses.find(c => c.id === courseId);

  // Courses already enrolled by the selected student
  const alreadyIn = studentId
    ? enrollments
        .filter(e => e.studentId === studentId)
        .map(e => e.courseId)
    : [];

  return (
    <div>
      <div className="page-header">
        <h1>Enroll Student</h1>
        <p>Assign a student to a course. Duplicate enrollments are prevented automatically.</p>
      </div>

      {/* Pre-conditions warning */}
      {students.length === 0 && (
        <div className="alert alert-warning">
          ⚠ No students found. <Link to="/students" className="link">Add students first.</Link>
        </div>
      )}
      {courses.length === 0 && (
        <div className="alert alert-warning">
          ⚠ No courses found. <Link to="/courses" className="link">Add courses first.</Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}>
        {/* Form */}
        <div className="form-card">
          <h2>Enrollment Form</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Student select */}
            <div className="form-group">
              <label>Select Student *</label>
              <select
                value={studentId}
                onChange={e => { setStudentId(e.target.value); setErrors({}); }}
                disabled={students.length === 0}
              >
                <option value="">— Choose a student —</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.email})
                  </option>
                ))}
              </select>
              {errors.student && <div className="error-text">⚠ {errors.student}</div>}
            </div>

            {/* Course select */}
            <div className="form-group">
              <label>Select Course *</label>
              <select
                value={courseId}
                onChange={e => { setCourseId(e.target.value); setErrors({}); }}
                disabled={courses.length === 0}
              >
                <option value="">— Choose a course —</option>
                {courses.map(c => {
                  const enrolled = alreadyIn.includes(c.id);
                  return (
                    <option key={c.id} value={c.id} disabled={enrolled}>
                      {c.code} – {c.name}{enrolled ? ' ✓ already enrolled' : ''}
                    </option>
                  );
                })}
              </select>
              {errors.course && <div className="error-text">⚠ {errors.course}</div>}
            </div>

            {/* Duplicate warning */}
            {alreadyEnrolled && (
              <div className="alert alert-error">
                ✕ This student is already enrolled in this course!
              </div>
            )}

            {/* Success message */}
            {submitted && (
              <div className="alert alert-success">
                ✓ Enrollment successful!
              </div>
            )}

            <button
              type="submit"
              className="btn btn-gold btn-full"
              disabled={students.length === 0 || courses.length === 0}
            >
              ✚ Enroll Student
            </button>
          </form>
        </div>

        {/* Preview panel */}
        <div>
          {(selectedStudent || selectedCourse) && (
            <div>
              {selectedStudent && (
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  border: '1px solid var(--border)',
                  marginBottom: '16px',
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '10px' }}>
                    SELECTED STUDENT
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)' }}>
                    {selectedStudent.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginTop: '4px' }}>
                    {selectedStudent.email}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <span className="badge badge-navy">{selectedStudent.major}</span>
                    <span className="badge badge-gold" style={{ marginLeft: '6px' }}>{selectedStudent.year}</span>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--text-light)' }}>
                    Currently enrolled in <strong>{alreadyIn.length}</strong> course(s)
                  </div>
                </div>
              )}

              {selectedCourse && (
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  border: `1px solid ${alreadyEnrolled ? 'var(--danger)' : 'var(--border)'}`,
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '10px' }}>
                    SELECTED COURSE
                  </div>
                  <div className="course-code">{selectedCourse.code}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--navy)' }}>
                    {selectedCourse.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginTop: '6px' }}>
                    👨‍🏫 {selectedCourse.instructor}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <span className="badge badge-gold">⭐ {selectedCourse.credits} Credits</span>
                  </div>
                  {alreadyEnrolled && (
                    <div className="badge badge-danger" style={{ marginTop: '8px', display: 'inline-flex' }}>
                      ✕ Already enrolled
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!selectedStudent && !selectedCourse && (
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              border: '2px dashed var(--border)',
              textAlign: 'center',
              color: 'var(--text-light)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✚</div>
              <p>Select a student and course to see a preview before enrolling.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
