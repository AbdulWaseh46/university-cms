import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import StudentCard from '../components/StudentCard';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const initialForm = { name: '', email: '', major: '', year: '1st Year' };

const Students = () => {
  const { students, addStudent } = useAppContext();

  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name  = 'Full name is required.';
    if (!form.email.trim())       e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email))
                                  e.email = 'Enter a valid email address.';
    else if (students.some(s => s.email.toLowerCase() === form.email.toLowerCase().trim()))
                                  e.email = 'A student with this email already exists.';
    if (!form.major.trim())       e.major = 'Major / department is required.';
    return e;
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    addStudent(form);
    setForm(initialForm);
    setErrors({});
    setShowForm(false);
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── Filter ────────────────────────────────────────────────
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.major.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1>Students</h1>
        <p>Manage all registered students in the system.</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrapper" style={{ marginBottom: 0 }}>
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search by name, email, or major…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(f => !f)}
        >
          {showForm ? '✕ Cancel' : '＋ Add Student'}
        </button>
      </div>

      {/* Add Student Form */}
      {showForm && (
        <div className="form-card" style={{ marginBottom: '32px' }}>
          <h2>Add New Student</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Ali"
                  value={form.name}
                  onChange={handleChange('name')}
                />
                {errors.name && <div className="error-text">⚠ {errors.name}</div>}
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. ahmed@uni.edu"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {errors.email && <div className="error-text">⚠ {errors.email}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Major / Department *</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={form.major}
                  onChange={handleChange('major')}
                />
                {errors.major && <div className="error-text">⚠ {errors.major}</div>}
              </div>
              <div className="form-group">
                <label>Year of Study</label>
                <select value={form.year} onChange={handleChange('year')}>
                  {YEARS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-gold btn-full">
              Add Student
            </button>
          </form>
        </div>
      )}

      {/* Count */}
      <div style={{ marginBottom: '16px', color: 'var(--text-mid)', fontSize: '0.9rem' }}>
        Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students
      </div>

      {/* Cards */}
      {students.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">👤</span>
          <h3>No Students Yet</h3>
          <p>Click "Add Student" above to register your first student.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No Results</h3>
          <p>No students match "<strong>{search}</strong>".</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(s => <StudentCard key={s.id} student={s} />)}
        </div>
      )}
    </div>
  );
};

export default Students;
