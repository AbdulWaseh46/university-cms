import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/CourseCard';

const initialForm = {
  code: '', name: '', instructor: '', credits: '3', description: '',
};

const Courses = () => {
  const { courses, addCourse } = useAppContext();

  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.code.trim())       e.code       = 'Course code is required (e.g. CS101).';
    else if (courses.some(c => c.code.toLowerCase() === form.code.trim().toLowerCase()))
                                 e.code       = 'This course code already exists.';
    if (!form.name.trim())       e.name       = 'Course name is required.';
    if (!form.instructor.trim()) e.instructor = 'Instructor name is required.';
    if (!form.credits || isNaN(Number(form.credits)) || Number(form.credits) < 1 || Number(form.credits) > 6)
                                 e.credits    = 'Credits must be between 1 and 6.';
    return e;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    addCourse(form);
    setForm(initialForm);
    setErrors({});
    setShowForm(false);
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── Filter ────────────────────────────────────────────────
  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Courses</h1>
        <p>Manage all available courses offered by the university.</p>
      </div>

      <div className="toolbar">
        <div className="search-wrapper" style={{ marginBottom: 0 }}>
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search by name, code, or instructor…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(f => !f)}
        >
          {showForm ? '✕ Cancel' : '＋ Add Course'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-card" style={{ marginBottom: '32px' }}>
          <h2>Add New Course</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>Course Code *</label>
                <input
                  type="text"
                  placeholder="e.g. CS101"
                  value={form.code}
                  onChange={handleChange('code')}
                />
                {errors.code && <div className="error-text">⚠ {errors.code}</div>}
              </div>
              <div className="form-group">
                <label>Credit Hours *</label>
                <input
                  type="number"
                  min="1" max="6"
                  placeholder="e.g. 3"
                  value={form.credits}
                  onChange={handleChange('credits')}
                />
                {errors.credits && <div className="error-text">⚠ {errors.credits}</div>}
              </div>
            </div>

            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                placeholder="e.g. Introduction to Programming"
                value={form.name}
                onChange={handleChange('name')}
              />
              {errors.name && <div className="error-text">⚠ {errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Instructor Name *</label>
              <input
                type="text"
                placeholder="e.g. Dr. Sara Khan"
                value={form.instructor}
                onChange={handleChange('instructor')}
              />
              {errors.instructor && <div className="error-text">⚠ {errors.instructor}</div>}
            </div>

            <div className="form-group">
              <label>Description (optional)</label>
              <textarea
                rows={3}
                placeholder="Brief overview of the course content…"
                value={form.description}
                onChange={handleChange('description')}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-gold btn-full">
              Add Course
            </button>
          </form>
        </div>
      )}

      {/* Count */}
      <div style={{ marginBottom: '16px', color: 'var(--text-mid)', fontSize: '0.9rem' }}>
        Showing <strong>{filtered.length}</strong> of <strong>{courses.length}</strong> courses
      </div>

      {/* Cards */}
      {courses.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📚</span>
          <h3>No Courses Yet</h3>
          <p>Click "Add Course" to create your first course.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No Results</h3>
          <p>No courses match "<strong>{search}</strong>".</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
};

export default Courses;
